import { useEffect, useState } from "react";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import CustomAlert from "../CustomAlert";
import Loading from "../Loading";
import CustomBarChart from "./CustomBarChart";

export default function SeasonsMonthChart() {
    const [seasonsByMonths, setSeasonsByMonths] = useState<Stat[]>([]);
    const [error, setError] = useState<ErrorMessage | null>(null);

    useEffect(() => {
        getNbSeasonsByYears();
    }, []);

    const getNbSeasonsByYears = async () => {
        const resp = await statService.getNbSeasonsByMonth();

        if (resp.status === 200) {
            const data: Stat[] = await resp.json();
            setSeasonsByMonths(data);
        } else {
            setError(await resp.json());
        }
    }
    return (
        <>
            {!seasonsByMonths && !error && <Loading />}

            {error && <CustomAlert variant="danger" message={error.message} />}

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