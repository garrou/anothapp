import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Area, AreaChart, Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Stat } from "../../models/stat/Stat";
import statService from "../../services/statService";
import AlertError from "../AlertError";
import Loading from "../Loading";

export default function SeasonsYearsChart() {
    const [seasonsByYears, setSeasonsByYears] = useState<Stat[]>([]);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        getNbSeasonsByYears();
    }, []);

    const getNbSeasonsByYears = async () => {
        const resp = await statService.getNbSeasonsByYears();

        if (resp.status === 200) {
            const data: Array<Stat> = await resp.json();
            setSeasonsByYears(data);
        } else {
            setError(await resp.json());
        }
    }

    return (
        <>
            {!seasonsByYears && <Loading />}

            {error && <AlertError message={error.message} />}

            {seasonsByYears && <Card className="mt-2">
                <Card.Body>
                    <Card.Title>Saisons vues par année</Card.Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            className="mt-3"
                            width={250}
                            height={250}
                            data={seasonsByYears}
                        >
                            <XAxis dataKey="label" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#f5962a" stroke="#f5962a" name="Saisons" />
                        </BarChart>                       
                    </ResponsiveContainer>
                </Card.Body>
            </Card>}
        </>
    );
}