import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Area, AreaChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Stat } from "../../models/stat/Stat";
import statService from "../../services/statService";
import AlertError from "../AlertError";
import Loading from "../Loading";

export default function TimeYearsChart() {
    const [timeByYears, setTimeByYears] = useState<Stat[]>([]);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        getTimeByYears();
    }, []);

    const getTimeByYears = async () => {
        const resp = await statService.getTimeByYears();

        if (resp.status === 200) {
            const data: Array<Stat> = await resp.json();
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
                    <Card.Title>Temps de visionnage par année</Card.Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart width={250} height={250} data={timeByYears}>
                            <XAxis dataKey="label" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area dataKey="value" stroke="#32a850" fill="#32a850" name="Temps en minutes" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card>}
        </>
    );
}