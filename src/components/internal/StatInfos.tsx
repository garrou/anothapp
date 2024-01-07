import { useEffect, useState } from "react";
import statService from "../../services/statService";
import { errorToast } from "../../helpers/toasts";
import { Row, Col, Card } from "react-bootstrap";
import { minsToStringDays, minsToStringHours } from "../../helpers/format";
import { FriendProps } from "../../models/internal/FriendProps";

export default function StatInfos(props: FriendProps) {
    return (
        <>
            <Row>
                <Col xs={12} md={6}>
                    <ViewingTimeMonthCard userId={props.userId} />
                </Col>
                <Col xs={12} md={6}>
                    <TotalViewingTimeCard userId={props.userId} />
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6}>
                    <NbShowsCard userId={props.userId} />
                </Col>
                <Col xs={12} md={6}>
                    <NbSeasonsCard userId={props.userId} />
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6}>
                    <NbEpisodesCard userId={props.userId} />
                </Col>
                <Col xs={12} md={6}>
                    <BestMonthViewingTime userId={props.userId} />
                </Col>
            </Row>
        </>
    );
}

function ViewingTimeMonthCard(props: FriendProps) {
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        getViewingTimeCurrentMonth();
    }, []);

    const getViewingTimeCurrentMonth = async () => {
        const resp = await statService.getTimeByType("month", props.userId);

        if (resp.status === 200)
            setTime(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <Card className="mt-2">
            <Card.Body>
                <Card.Title>Ce mois</Card.Title>
                {time > 0 && <ul>
                    <li>{minsToStringDays(time)}</li>
                    <li>{minsToStringHours(time)}</li>
                    <li>{time} minutes</li>
                </ul>}
            </Card.Body>
        </Card>
    );
}

function TotalViewingTimeCard(props: FriendProps) {
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        getTotalTime();
    }, []);

    const getTotalTime = async () => {
        const resp = await statService.getTimeByType("total", props.userId);

        if (resp.status === 200)
            setTime(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <Card className="mt-2">
            <Card.Body>
                <Card.Title>Temps total</Card.Title>
                {time > 0 && <ul>
                    <li>{minsToStringDays(time)}</li>
                    <li>{minsToStringHours(time)}</li>
                    <li>{time} minutes</li>
                </ul>}
            </Card.Body>
        </Card>
    );
}

function NbShowsCard(props: FriendProps) {
    const [num, setNum] = useState(0);

    useEffect(() => {
        getNbShows();
    }, []);

    const getNbShows = async () => {
        const resp = await statService.getCountByType("shows", props.userId);

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

function NbEpisodesCard(props: FriendProps) {
    const [num, setNum] = useState(0);

    useEffect(() => {
        getNbEpisodes();
    }, []);

    const getNbEpisodes = async () => {
        const resp = await statService.getCountByType("episodes", props.userId);

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

function NbSeasonsCard(props: FriendProps) {
    const [num, setNum] = useState(0);

    useEffect(() => {
        getNbShows();
    }, []);

    const getNbShows = async () => {
        const resp = await statService.getCountByType("seasons", props.userId);

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


function BestMonthViewingTime(props: FriendProps) {

    interface MonthRecord {
        date: string,

        time: number
    }
    const [record, setRecord] = useState<MonthRecord>();

    useEffect(() => {
        getMonthRecord();
    }, []);

    const getMonthRecord = async () => {
        const resp = await statService.getTimeByType("best-month", props.userId);

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
