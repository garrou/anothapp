import { useEffect, useState } from "react";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import statService from "../../services/statService";
import AlertError from "../AlertError";
import { Card } from "react-bootstrap";
import { minsToStringHours } from "../../helpers/format";

interface MonthRecord {

    date: string, 

    time: number
}

export default function MonthRecordViewingTime() {
    const [record, setRecord] = useState<MonthRecord|null>(null);
    const [error, setError] = useState<ErrorMessage|null>(null);

    useEffect(() => {
        getMonthRecord();
    }, []);

    const getMonthRecord = async () => {
        const resp = await statService.getMonthRecord();

        console.log(resp)

        if (resp.status === 200) {
            setRecord(await resp.json());
        } else {
            setError(await resp.json());
        }
    }

    return (
        <>
            {error && <AlertError message={error.message} />}

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