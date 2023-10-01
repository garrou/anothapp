import { useEffect, useState } from "react";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import AlertError from "../AlertError";
import Loading from "../Loading";
import CustomBarChart from "./CustomBarChart";

export default function SeasonsYearsChart() {
    const [seasonsByYears, setSeasonsByYears] = useState<Stat[]>([]);
    const [error, setError] = useState<ErrorMessage|null>(null);

    useEffect(() => {
        getNbSeasonsByYears();
    }, []);

    const getNbSeasonsByYears = async () => {
        const resp = await statService.getNbSeasonsByYears();

        if (resp.status === 200) {
            const data: Stat[] = await resp.json();
            setSeasonsByYears(data);
        } else {
            setError(await resp.json());
        }
    }

    return (
        <>
            {!seasonsByYears && !error && <Loading />}

            {error && <AlertError message={error.message} />}

            {seasonsByYears && <CustomBarChart 
                color="#f5962a" 
                title="Saisons par années" 
                data={seasonsByYears} 
                legend="Saisons"
                ratio={20}
            />}
        </>
    );
}