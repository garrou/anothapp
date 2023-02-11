import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { minsToStringDays, minsToStringHours } from "../../helpers/format";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import statService from "../../services/statService";
import AlertError from "../AlertError";

export default function ViewingTimeMonthCard() {
    const [time, setTime] = useState<number>(0);
    const [error, setError] = useState<ErrorMessage|null>(null);

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
                    <Card.Title>Ce mois</Card.Title>
                    <Card.Text>
                        {minsToStringDays(time)} • {minsToStringHours(time)} • {time} minutes
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}