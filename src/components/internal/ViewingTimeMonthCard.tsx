import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { minsToStringDays, minsToStringHours } from "../../helpers/format";
import statService from "../../services/statService";
import AlertError from "../AlertError";

export default function ViewingTimeMonthCard() {
    const [time, setTime] = useState<number>(0);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        getViewingTimeCurrentMonth();
    }, []);

    const getViewingTimeCurrentMonth = async () => {
        const resp = await statService.getTimeCurrentMonth();

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
                    <Card.Title>Temps de visionnage pour ce mois</Card.Title>
                    <Card.Text>
                        {minsToStringHours(time)} • {minsToStringDays(time)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}