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

        if (resp.status === 200) {
            setTime(await resp.json());
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <>
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