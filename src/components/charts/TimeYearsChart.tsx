import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import AlertError from "../AlertError";
import Loading from "../Loading";

export default function TimeYearsChart() {
    const [timeByYears, setTimeByYears] = useState<Stat[]>([]);
    const [error, setError] = useState<ErrorMessage|null>(null);

    useEffect(() => {
        getTimeByYears();
    }, []);

    const getTimeByYears = async () => {
        const resp = await statService.getTimeByYears();

        if (resp.status === 200) {
            const data: Stat[] = await resp.json();
            setTimeByYears(data);
        } else {
            setError(await resp.json());
        }
    }

    return (
        <>
            {!timeByYears && !error && <Loading />}

            {error && <AlertError message={error.message} />}

            {timeByYears && <Card className="mt-2">
                <Card.Body>
                    <Card.Title>Temps par année</Card.Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart className="mt-3" width={250} height={300} data={timeByYears}>
                            <XAxis dataKey="label" />
                            <YAxis ticks={Array.from(timeByYears, (t) => Math.round(t.value / 100) * 100)} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#32a850" stroke="#32a850" name="Temps en heures" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card>}
        </>
    );
}