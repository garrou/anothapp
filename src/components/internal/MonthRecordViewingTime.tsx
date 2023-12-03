import { useEffect, useState } from "react";
import statService from "../../services/statService";
import { errorToast } from "../../helpers/toasts";
import { Card } from "react-bootstrap";
import { minsToStringHours } from "../../helpers/format";

interface MonthRecord {

    date: string, 

    time: number
}

export default function MonthRecordViewingTime() {
    const [record, setRecord] = useState<MonthRecord|null>(null);
    useEffect(() => {
        getMonthRecord();
    }, []);

    const getMonthRecord = async () => {
        const resp = await statService.getTimeByType("best-month");

        if (resp.status === 200) {
            setRecord(await resp.json());
        } else {
            errorToast(await resp.json());
        }
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