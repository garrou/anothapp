import { useEffect, useState } from "react";
import statService from "../../services/statService";
import Loading from "../Loading";
import CustomBarChart from "./CustomBarChart";
import { errorToast } from "../../helpers/toasts";

interface RankedShow {

    title: string

    time: number
}

export default function ShowsTimeRankingChart() {
    const [shows, setShows] = useState<RankedShow[]>([]);


    useEffect(() => {
        getRanking();
    }, []);

    const getRanking = async () => {
        const resp = await statService.getTimeByType("rank");

        if (resp.status === 200) {
            const data: RankedShow[] = await resp.json();
            setShows(data);
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <>
            {!shows && <Loading />}

            {shows && <CustomBarChart
                color="#0bb5b8"
                title="10 séries les plus chronophages"
                data={shows}
                legend="Heures"
                ratio={20}
            />}
        </>
    );
}