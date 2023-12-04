import { useEffect, useState } from "react";
import statService from "../../services/statService";
import Loading from "../Loading";
import { errorToast } from "../../helpers/toasts";
import { Stat } from "../../models/internal/Stat";
import CustomChartWrapper from "./CustomChartWrapper";

export default function ShowsTimeRankingChart() {
    const [shows, setShows] = useState<Stat[]>([]);


    useEffect(() => {
        getRanking();
    }, []);

    const getRanking = async () => {
        const resp = await statService.getTimeByType("rank");

        if (resp.status === 200) {
            setShows(await resp.json());
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <>
            {shows.length === 0 && <Loading />}

            {shows.length > 0 && <CustomChartWrapper
                id="shows-chart"
                color="#0bb5b8"
                title="10 séries les plus chronophages"
                data={shows}
                legend="Heures"
                ratio={50}
                max={100}
            />}
        </>
    );
}