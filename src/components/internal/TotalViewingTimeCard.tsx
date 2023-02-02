import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { minsToStringDays, minsToStringHours } from "../../helpers/format";
import statService from "../../services/statService";

export default function TotalViewingTimeCard() {
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        getTotalTime();
    }, []);

    const getTotalTime = async () => {
        const resp = await statService.getTotalTime();

        if (resp.status === 200) {
            setTime(await resp.json());
        }
    }

    return (
        <Card className="mt-2">
            <Card.Body>
                <Card.Title>Temps total de visionnage</Card.Title>
                <Card.Text>
                    {minsToStringHours(time)} • {minsToStringDays(time)}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}