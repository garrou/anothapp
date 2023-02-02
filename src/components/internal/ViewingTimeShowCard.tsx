import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { minsToStringDays, minsToStringHours } from "../../helpers/format";
import showService from "../../services/showService";
import AlertError from "../AlertError";

interface Props {
    showId: number
}

export default function ViewingTimeShowCard({ showId }: Props) {
    const [time, setTime] = useState<number>(0);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        getViewingTime();
    }, []);

    const getViewingTime = async () => {
        const resp = await showService.getViewedTimeByShowId(showId);

        if (resp.status === 200) {
            setTime(await resp.json());
        } else {
            setError(await resp.json());
        }
    }

    return (
        <>
            {error && <AlertError message={error.message} />}

            <Card className="mt-2">
                <Card.Body>
                    <Card.Title>Temps de visionnage</Card.Title>
                    <Card.Text>
                        {minsToStringHours(time)} • {minsToStringDays(time)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}