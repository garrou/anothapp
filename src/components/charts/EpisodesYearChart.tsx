import { useEffect, useState } from "react";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import { errorToast } from "../../helpers/toasts";
import CustomChartWrapper from "./generics/CustomChartWrapper";
import { FriendProps } from "../../models/internal/FriendProps";

export default function EpisodesYearChart(props: FriendProps) {
    const [episodesByYear, setEpisodesByYears] = useState<Stat[]>([]);

    useEffect(() => {
        getEpisodesByYears();
    }, []);

    const getEpisodesByYears = async (): Promise<void> => {
        const resp = await statService.getGroupedCountByTypeByPeriod("episodes", "years", props.userId);

        if (resp.status === 200)
            setEpisodesByYears(await resp.json());
        else
            errorToast(await resp.json());
    }

    const handleClick = (data: any) => {
        console.log(data);
    }

    return (
        <>
            {episodesByYear.length > 0 ? <CustomChartWrapper
                id="episodes-years-chart"
                color="#4287f5"
                title="Episodes par années"
                data={episodesByYear}
                legend="Episodes"
                range={500}
                max={2000}
                click={handleClick}
            /> : <p className="text-center mt-3">Aucune statistique</p>}
        </>
    );
}