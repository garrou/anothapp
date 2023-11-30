import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { minsToStringDays, minsToStringHours } from "../../helpers/format";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import showService from "../../services/showService";
import CustomAlert from "../CustomAlert";

interface Props {
    showId: string
    num: string
}

export default function ViewingTimeSeasonCard({ showId, num }: Props) {
    const [time, setTime] = useState<number>(0);
    const [error, setError] = useState<ErrorMessage|null>(null);

    useEffect(() => {
        getViewingTimeBySeasonNumber();
    }, []);

    const getViewingTimeBySeasonNumber = async () => {
        const resp = await showService.getViewedTimeByShowIdBySeason(Number(showId), Number(num));

        if (resp.status === 200) {
            setTime(await resp.json());
        } else {
            setError(await resp.json());
        }
    }

    return (
        <>
            {error && <CustomAlert variant="danger" message={error.message} />}

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