import { useEffect, useState } from "react";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import Loading from "../Loading";
import CustomBarChart from "./CustomBarChart";
import { errorToast } from "../../helpers/toasts";

export default function SeasonsMonthChart() {
    const [seasonsByMonths, setSeasonsByMonths] = useState<Stat[]>([]);

    useEffect(() => {
        getNbSeasonsByYears();
    }, []);

    const getNbSeasonsByYears = async () => {
        const resp = await statService.getNbSeasonsByMonth();

        if (resp.status === 200) {
            const data: Stat[] = await resp.json();
            setSeasonsByMonths(data);
        } else {
            errorToast(await resp.json());
        }
    }
    return (
        <>
            {!seasonsByMonths && <Loading />}

            {seasonsByMonths && <CustomBarChart 
                color="#ae34eb" 
                title="Saisons par mois" 
                data={seasonsByMonths} 
                legend="Saisons"
                ratio={20}
            />}
        </>
    );
}