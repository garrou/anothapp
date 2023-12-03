import { useEffect, useState } from "react";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import Loading from "../Loading";
import { errorToast } from "../../helpers/toasts";
import CustomLineChart from "./CustomLineChart";

export default function SeasonsMonthChart() {
    const [seasonsByMonths, setSeasonsByMonths] = useState<Stat[]>([]);

    useEffect(() => {
        getNbSeasonsByMonths();
    }, []);

    const getNbSeasonsByMonths = async () => {
        const resp = await statService.getGroupedCountByTypeByPeriod("seasons", "months");

        if (resp.status === 200) {
            setSeasonsByMonths(await resp.json());
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <>
            {seasonsByMonths.length === 0 && <Loading />}

            {seasonsByMonths.length > 0 && <CustomLineChart 
                color="#ae34eb" 
                title="Saisons par mois" 
                data={seasonsByMonths} 
                legend="Saisons"
                max={150}
            />}
        </>
    );
}