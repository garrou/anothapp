import { useEffect, useState } from "react";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import Loading from "../Loading";
import CustomBarChart from "./CustomBarChart";
import { errorToast } from "../../helpers/toasts";

export default function SeasonsYearsChart() {
    const [seasonsByYears, setSeasonsByYears] = useState<Stat[]>([]);

    useEffect(() => {
        getNbSeasonsByYears();
    }, []);

    const getNbSeasonsByYears = async () => {
        const resp = await statService.getGroupedCountByTypeByPeriod("seasons", "years");

        if (resp.status === 200) {
            const data: Stat[] = await resp.json();
            setSeasonsByYears(data);
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <>
            {seasonsByYears.length === 0 && <Loading />}

            {seasonsByYears.length > 0 && <CustomBarChart
                color="#f5962a"
                title="Saisons par années"
                data={seasonsByYears}
                legend="Saisons"
                max={200}
            />}
        </>
    );
}