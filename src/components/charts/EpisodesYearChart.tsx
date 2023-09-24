import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Bar, BarChart, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import AlertError from "../AlertError";
import Loading from "../Loading";

export default function EpisodesYearChart() {
    const [episodesByYear, setEpisodesByYears] = useState<Stat[]>([]);
    const [error, setError] = useState<ErrorMessage | null>(null);

    useEffect(() => {
        getTimeByYears();
    }, []);

    const getTimeByYears = async () => {
        const resp = await statService.getNbEpisodesByYear();

        if (resp.status === 200) {
            const data: Stat[] = await resp.json();
            setEpisodesByYears(data);
        } else {
            setError(await resp.json());
        }
    }

    return (
        <>
            {!episodesByYear && !error && <Loading />}

            {error && <AlertError message={error.message} />}

            {episodesByYear && <Card className="mt-2">
                <Card.Body>
                    <Card.Title>Episodes par année</Card.Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart className="mt-3" width={250} height={300} data={episodesByYear}>
                            <XAxis dataKey="label" />
                            <YAxis ticks={Array.from(episodesByYear, (e) => Math.round(e.value / 500) * 500)} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#4287f5" stroke="#4287f5" name="Episodes" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card>}
        </>
    );
}