import { useEffect, useState } from "react";
import { Stat } from "../../models/internal/Chart";
import statService from "../../services/statService";
import { errorToast } from "../../helpers/toasts";
import CustomChartWrapper from "./generics/CustomChartWrapper";
import { FriendProps } from "../../models/internal/Friend";

export default function SeasonsMonthChart(props: FriendProps) {
    const [seasonsByMonths, setSeasonsByMonths] = useState<Stat[]>([]);

    useEffect(() => {
        getNbSeasonsByMonths();
    }, []);

    const getNbSeasonsByMonths = async () => {
        const resp = await statService.getGroupedCountByTypeByPeriod("seasons", "months", props.userId);

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
                id="seasons-months-chart"
                color="#ae34eb"
                title="Saisons par mois"
                data={seasonsByMonths}
                legend="Saisons"
                range={25}
                max={100}
                click={handleClick}
            /> : <p className="text-center mt-3">Aucune statistique</p>}
        </>
    );
}
