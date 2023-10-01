import { useEffect, useState } from "react";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import AlertError from "../AlertError";
import Loading from "../Loading";
import CustomBarChart from "./CustomBarChart";

export default function TimeYearsChart() {
    const [timeByYears, setTimeByYears] = useState<Stat[]>([]);
    const [error, setError] = useState<ErrorMessage|null>(null);

    useEffect(() => {
        getTimeByYears();
    }, []);

    const getTimeByYears = async () => {
        const resp = await statService.getTimeByYears();

        if (resp.status === 200) {
            const data: Stat[] = await resp.json();
            setTimeByYears(data);
        } else {
            setError(await resp.json());
        }
    }

    return (
        <>
            {!timeByYears && !error && <Loading />}

            {error && <AlertError message={error.message} />}

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