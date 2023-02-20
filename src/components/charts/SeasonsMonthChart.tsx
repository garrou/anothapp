import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import AlertError from "../AlertError";
import Loading from "../Loading";

export default function SeasonsMonthChart() {
    const [seasonsByMonths, setSeasonsByMonths] = useState<Stat[]>([]);
    const [error, setError] = useState<ErrorMessage|null>(null);

    useEffect(() => {
        getNbSeasonsByYears();
    }, []);

    const getNbSeasonsByYears = async () => {
        const resp = await statService.getNbSeasonsByMonth();

        if (resp.status === 200) {
            const data: Stat[] = await resp.json();
            setSeasonsByMonths(data);
        } else {
            setError(await resp.json());
        }
    }
    return (
        <>
            {!seasonsByMonths && !error && <Loading />}

            {error && <AlertError message={error.message} />}

            {seasonsByMonths && <Card className="mt-2">
                <Card.Body>
                    <Card.Title>Saisons vues par mois</Card.Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            className="mt-3"
                            width={250}
                            height={250}
                            data={seasonsByMonths}
                        >
                            <XAxis dataKey="label" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#ae34eb" stroke="#ae34eb" name="Saisons" />
                        </BarChart>                       
                    </ResponsiveContainer>
                </Card.Body>
            </Card>}
        </>
    );
}