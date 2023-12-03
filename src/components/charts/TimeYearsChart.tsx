import { useEffect, useState } from "react";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import Loading from "../Loading";
import CustomBarChart from "./CustomBarChart";
import { errorToast } from "../../helpers/toasts";

export default function TimeYearsChart() {
    const [timeByYears, setTimeByYears] = useState<Stat[]>([]);

    useEffect(() => {
        getTimeByYears();
    }, []);

    const getTimeByYears = async () => {
        const resp = await statService.getTimeByType("years");

        if (resp.status === 200) {
            setTimeByYears(await resp.json());
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <>
            {timeByYears.length === 0 && <Loading />}

            {timeByYears.length > 0 && <CustomBarChart
                color="#32a850"
                title="Temps par année"
                data={timeByYears}
                legend="Temps en heures"
                max={2500}
            />}
        </>
    );
}