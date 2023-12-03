import { useEffect, useState } from "react";
import statService from "../../services/statService";
import Loading from "../Loading";
import CustomBarChart from "./CustomBarChart";
import { errorToast } from "../../helpers/toasts";
import { Stat } from "../../models/internal/Stat";

export default function ShowsTimeRankingChart() {
    const [shows, setShows] = useState<Stat[]>([]);


    useEffect(() => {
        getRanking();
    }, []);

    const getRanking = async () => {
        const resp = await statService.getTimeByType("rank");

        if (resp.status === 200) {
            const data: Stat[] = await resp.json();
            setShows(data);
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <>
            {shows.length === 0 && <Loading />}

            {shows.length > 0 && <CustomBarChart
                color="#0bb5b8"
                title="10 séries les plus chronophages"
                data={shows}
                legend="Heures"
                max={1000}
            />}
        </>
    );
}