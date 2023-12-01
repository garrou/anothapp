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
        const resp = await statService.getTimeByYears();

        if (resp.status === 200) {
            const data: Stat[] = await resp.json();
            setTimeByYears(data);
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <>
            {!timeByYears && <Loading />}

            {timeByYears && <CustomBarChart
                color="#32a850"
                title="Temps par année"
                data={timeByYears}
                legend="Temps en heures"
                ratio={100}
            />}
        </>
    );
}