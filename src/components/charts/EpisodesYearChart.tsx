import { useEffect, useState } from "react";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import { errorToast } from "../../helpers/toasts";
import Loading from "../Loading";
import CustomChartWrapper from "./CustomChartWrapper";

export default function EpisodesYearChart() {
    const [episodesByYear, setEpisodesByYears] = useState<Stat[]>([]);

    useEffect(() => {
        getEpisodesByYears();
    }, []);

    const getEpisodesByYears = async (): Promise<void> => {
        const resp = await statService.getGroupedCountByTypeByPeriod("episodes", "years");

        if (resp.status === 200) {
            setEpisodesByYears(await resp.json());
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <>
            {episodesByYear.length === 0 && <Loading />}

            {episodesByYear.length > 0 && <CustomChartWrapper
                id="episodes-years-chart"
                color="#4287f5"
                title="Episodes par années"
                data={episodesByYear}
                legend="Episodes"
                ratio={500}
                max={2000}
            />}
        </>
    );
}