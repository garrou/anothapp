import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { minsToStringHoursDays } from "../../helpers/format";
import showService from "../../services/showService";
import { errorToast } from "../../helpers/toasts";

interface Props {
    
    showId: number;

    loaded: boolean;
}

export default function ViewingTimeShowCard({ showId, loaded }: Props) {
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        getViewingTime();
    }, [loaded]);

    const getViewingTime = async () => {
        const resp = await showService.getViewedTimeByShowId(showId);

        if (resp.status === 200)
            setTime(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <>
            <Card className="my-2">
                <Card.Body>
                    <Card.Title>Temps de visionnage</Card.Title>
                    <Card.Text>{minsToStringHoursDays(time)}</Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}