import { useEffect, useState } from "react";
import statService from "../../services/statService";
import { errorToast } from "../../helpers/toasts";
import { Row, Col, Card } from "react-bootstrap";
import { minsToStringDays, minsToStringHours } from "../../helpers/format";

export default function StatInfos() {
    return (
        <>
            <Row>
                <Col><ViewingTimeMonthCard /></Col>
                {/* <Col><MonthRecordViewingTime/></Col> */}
                <Col><TotalViewingTimeCard /></Col>
            </Row>
            < Row >
                <Col><NbShowsCard /></Col>
                <Col><NbEpisodesCard /></Col>
            </Row>
            < Row >
                <Col><NbSeasonsCard /></Col>
            </Row>
        </>
    );
}

function ViewingTimeMonthCard() {
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        getViewingTimeCurrentMonth();
    }, []);

    const getViewingTimeCurrentMonth = async () => {
        const resp = await statService.getTimeByType("month");

        if (resp.status === 200)
            setTime(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <Card className="mt-2">
            <Card.Body>
                <Card.Title>Ce mois</Card.Title>
                <ul>
                    <li>{minsToStringDays(time)}</li>
                    <li>{minsToStringHours(time)}</li>
                    <li>{time} minutes</li>
                </ul>
            </Card.Body>
        </Card>
    );
}

function TotalViewingTimeCard() {
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        getTotalTime();
    }, []);

    const getTotalTime = async () => {
        const resp = await statService.getTimeByType("total");

        if (resp.status === 200)
            setTime(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <Card className="mt-2">
            <Card.Body>
                <Card.Title>Temps total</Card.Title>
                <ul>
                    <li>{minsToStringDays(time)}</li>
                    <li>{minsToStringHours(time)}</li>
                    <li>{time} minutes</li>
                </ul>
            </Card.Body>
        </Card>
    );
}

function NbShowsCard() {
    const [num, setNum] = useState(0);

    useEffect(() => {
        getNbShows();
    }, []);

    const getNbShows = async () => {
        const resp = await statService.getCountByType("shows");

        if (resp.status === 200)
            setNum(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <Card className="mt-2" >
            <Card.Body>
                <Card.Title>{num} série{num > 1 && "s"} </Card.Title>
            </Card.Body>
        </Card>
    );
}

function NbEpisodesCard() {
    const [num, setNum] = useState(0);

    useEffect(() => {
        getNbEpisodes();
    }, []);

    const getNbEpisodes = async () => {
        const resp = await statService.getCountByType("episodes");

        if (resp.status === 200)
            setNum(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <Card className="mt-2">
            <Card.Body>
                <Card.Title>{num} épisode{num > 1 && "s"}</Card.Title>
            </Card.Body>
        </Card>
    );
}

function NbSeasonsCard() {
    const [num, setNum] = useState(0);

    useEffect(() => {
        getNbShows();
    }, []);

    const getNbShows = async () => {
        const resp = await statService.getCountByType("seasons");

        if (resp.status === 200)
            setNum(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <Card className="mt-2" >
            <Card.Body>
                <Card.Title>{num} saison{num > 1 && "s"} </Card.Title>
            </Card.Body>
        </Card>
    );
}


function MonthRecordViewingTime() {

    interface MonthRecord {
        date: string,

        time: number
    }
    const [record, setRecord] = useState<MonthRecord | null>(null);

    useEffect(() => {
        getMonthRecord();
    }, []);

    const getMonthRecord = async () => {
        const resp = await statService.getTimeByType("best-month");

        if (resp.status === 200)
            setRecord(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <>
            <Card className="mt-2">
                <Card.Body>
                    <Card.Title>Mois avec le plus de visionnage</Card.Title>
                    <Card.Text>
                        {record?.date} • {minsToStringHours(record?.time ?? 0)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}
