import { useEffect, useState } from "react";
import { Card, Tooltip } from "react-bootstrap";
import { Area, AreaChart, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import AlertError from "../AlertError";
import Loading from "../Loading";

export default function EpisodesYearChart() {
    const [episodesByYear, setEpisodesByYears] = useState<Stat[]>([]);
    const [error, setError] = useState<ErrorMessage|null>(null);

    useEffect(() => {
        getTimeByYears();
    }, []);

    const getTimeByYears = async () => {
        const resp = await statService.getNbEpisodesByYear();

        if (resp.status === 200) {
            const data: Array<Stat> = await resp.json();
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
                        <AreaChart width={250} height={250} data={episodesByYear}>
                            <XAxis dataKey="label" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area dataKey="value" stroke="#32a850" fill="#32a850" name="Episodes" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card>}
        </>
    );
}