import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Stat } from "../../models/stat/Stat";
import statService from "../../services/statService";
import Loading from "../Loading";

export default function TimeYearsChart() {
    const [timeByYears, setTimeByYears] = useState<Stat[]>([]);

    useEffect(() => {
        getTimeByYears();
    }, []);

    const getTimeByYears = async () => {
        const resp = await statService.getTimeByYears();

        if (resp.status === 200) {
            const data: Array<Stat> = await resp.json();
            setTimeByYears(data);
        }
    }

    return (
        <>
            {!timeByYears && <Loading />}

            {timeByYears && <Card className="mt-2">
                <Card.Body>
                    <Card.Title>Temps de visionnage par année</Card.Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            className="mt-3"
                            width={250}
                            height={250}
                            data={timeByYears}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#09ba85" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card>}
        </>
    );
}