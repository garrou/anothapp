import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SeasonByYear } from "../../models/stat/SeasonByYear";
import statService from "../../services/statService";
import Loading from "../Loading";

export default function SeasonsYearsChart() {
    const [seasonsByYears, setSeasonsByYears] = useState<SeasonByYear[]>([]);

    useEffect(() => {
        getNbSeasonsByYears();
    }, []);

    const getNbSeasonsByYears = async () => {
        const resp = await statService.getNbSeasonsByYears();

        if (resp.status === 200) {
            const data: Array<SeasonByYear> = await resp.json();
            setSeasonsByYears(data);
        }
    }

    return (
        <>
            {!seasonsByYears && <Loading />}

            {seasonsByYears && <Card className="mt-2">
                <Card.Body>
                    <Card.Title>Saisons vues par année</Card.Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            className="mt-3"
                            width={250}
                            height={250}
                            data={seasonsByYears}
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
                            <Bar dataKey="value" fill="#f5962a" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card>}
        </>
    );
}