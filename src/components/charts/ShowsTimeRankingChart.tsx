import { useEffect, useState } from "react";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import statService from "../../services/statService";
import AlertError from "../AlertError";
import Loading from "../Loading";
import CustomBarChart from "./CustomBarChart";

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

            {shows && <CustomBarChart 
                color="#0bb5b8" 
                title="10 séries les plus chronophages" 
                data={shows} 
                legend="Heures"
                ratio={20}
            />}
        </>
    );
}