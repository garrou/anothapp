import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import statService from "../../services/statService";
import AlertError from "../AlertError";
import Loading from "../Loading";

interface RankedShow {

    title: string

    time: number
}

export default function ShowsTimeRankingChart() {
    const [shows, setShows] = useState<RankedShow[]>([]);
    const [error, setError] = useState<ErrorMessage | null>(null);

    useEffect(() => {
        getRanking();
    }, []);

    const getRanking = async () => {
        const resp = await statService.getRankingShowsTime();

        if (resp.status === 200) {
            const data: RankedShow[] = await resp.json();
            setShows(data);
        } else {
            setError(await resp.json());
        }
    }

    return (
        <>
            {!shows && !error && <Loading />}

            {error && <AlertError message={error.message} />}

            {shows && <Card className="mt-2">
                <Card.Body>
                    <Card.Title>10 séries les plus chronophages</Card.Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart className="mt-3" width={250} height={300} data={shows}>
                            <XAxis dataKey="title" />
                            <YAxis ticks={Array.from({ length: 11 }, (_, i) => i * 100)} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="time" fill="#0bb5b8" stroke="#0bb5b8" name="Heures" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card>}
        </>
    );
}