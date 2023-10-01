import { useEffect, useState } from "react";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import AlertError from "../AlertError";
import Loading from "../Loading";
import CustomBarChart from "./CustomBarChart";

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

            {episodesByYear && <CustomBarChart 
                color="#4287f5" 
                title="Episodes par année" 
                data={episodesByYear} 
                legend="Episodes"
                ratio={500}
            />}
        </>
    );
}