import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { minsToStringDays, minsToStringHours } from "../../helpers/format";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import statService from "../../services/statService";
import CustomAlert from "../CustomAlert";

export default function TotalViewingTimeCard() {
    const [time, setTime] = useState<number>(0);
    const [error, setError] = useState<ErrorMessage|null>(null);

    useEffect(() => {
        getTotalTime();
    }, []);

    const getTotalTime = async () => {
        const resp = await statService.getTotalTime();

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
                    <Card.Title>Temps total</Card.Title>
                    <Card.Text>
                        {minsToStringDays(time)} • {minsToStringHours(time)} • {time} minutes
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}