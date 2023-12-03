import { useEffect, useState } from "react";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import Loading from "../Loading";
import CustomBarChart from "./CustomBarChart";
import { errorToast } from "../../helpers/toasts";

export default function SeasonsMonthChart() {
    const [seasonsByMonths, setSeasonsByMonths] = useState<Stat[]>([]);

    useEffect(() => {
        getNbSeasonsByMonths();
    }, []);

    const getNbSeasonsByMonths = async () => {
        const resp = await statService.getGroupedCountByTypeByPeriod("seasons", "months");

        if (resp.status === 200) {
            const data: Stat[] = await resp.json();
            setSeasonsByMonths(data);
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <>
            {seasonsByMonths.length === 0 && <Loading />}

            {seasonsByMonths.length > 0 && <CustomBarChart 
                color="#ae34eb" 
                title="Saisons par mois" 
                data={seasonsByMonths} 
                legend="Saisons"
                max={150}
            />}
        </>
    );
}