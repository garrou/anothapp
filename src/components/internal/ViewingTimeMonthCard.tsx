import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { minsToStringDays, minsToStringHours } from "../../helpers/format";
import statService from "../../services/statService";
import { errorToast } from "../../helpers/toasts";

export default function ViewingTimeMonthCard() {
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
        <>
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
        </>
    );
}