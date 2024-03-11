import { useState, useEffect } from "react";
import { errorToast } from "../../helpers/toasts";
import { FriendProps } from "../../models/internal/Friend";
import { Stat } from "../../models/internal/Chart";
import statService from "../../services/statService";
import CustomChartWrapper from "./generics/CustomChartWrapper";

export default function SeasonsMonthCurrentYearChart(props: FriendProps) {
    const [seasonsByMonths, setSeasonsByMonths] = useState<Stat[]>([]);

    useEffect(() => {
        getNbSeasonsByMonths();
    }, []);

    const getNbSeasonsByMonths = async () => {
        const resp = await statService.getGroupedCountByTypeByPeriod("seasons", "year", props.userId);

        if (resp.status === 200)
            setSeasonsByMonths(await resp.json());
        else
            errorToast(await resp.json());
    }

    const handleClick = (data: any) => {
        console.log(data);
    }

    return (
        <>
            {seasonsByMonths.length > 0 ? <CustomChartWrapper
                id="seasons-months-chart-current-year"
                color="#ae34eb"
                title="Saisons par mois cette année"
                data={seasonsByMonths}
                legend="Saisons"
                range={25}
                max={100}
                click={handleClick}
            /> : <p className="text-center mt-3">Aucune statistique</p>}
        </>
    );
}