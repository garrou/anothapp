import { useState, useEffect } from "react";
import { errorToast } from "../../helpers/toasts";
import { FriendProps } from "../../models/internal/Friend";
import statService from "../../services/statService";
import CustomChartWrapper from "./generics/CustomChartWrapper";
import { Stat } from "../../models/internal/Chart";

export default function EpisodesMonthCurrentYearChart(props: FriendProps) {
    const [episodesByMonths, setEpisodesByMonths] = useState<Stat[]>([]);

    useEffect(() => {
        getNbEpisodesByMonths();
    }, []);

    const getNbEpisodesByMonths = async () => {
        const resp = await statService.getGroupedCountByTypeByPeriod("episodes", "year", props.userId);

        if (resp.status === 200)
            setEpisodesByMonths(await resp.json());
        else
            errorToast(await resp.json());
    }

    const handleClick = (data: any) => {
        console.log(data);
    }

    return (
        <>
            {episodesByMonths.length > 0 ? <CustomChartWrapper
                id="episodes-months-chart-current-year"
                color="#ae34eb"
                title="Episodes par mois cette l'année"
                data={episodesByMonths}
                legend="Episodes"
                range={25}
                max={1000}
                click={handleClick}
            /> : <p className="text-center mt-3">Aucune statistique</p>}
        </>
    );
}