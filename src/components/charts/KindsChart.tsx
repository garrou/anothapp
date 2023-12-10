import { useEffect, useState } from "react";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import { errorToast } from "../../helpers/toasts";
import Loading from "../Loading";
import CustomChartWrapper from "./CustomChartWrapper";

export default function KindsChart() {
    const [kinds, setKinds] = useState<Stat[]>([]);

    useEffect(() => {
        getKinds();
    }, []);

    const getKinds = async (): Promise<void> => {
        const resp = await statService.getGroupedCountByTypeByPeriod("kinds", "");

        if (resp.status === 200)
            setKinds(await resp.json());
        else
            errorToast(await resp.json());
    }

    const handleClick = (data: any) => {
        console.log(data);
    }

    return (
        <>
            {kinds.length > 0 ? <CustomChartWrapper 
                id="kinds-chart"
                color="#329ea8" 
                title="10 genres les plus regardés" 
                data={kinds.reverse()} 
                legend="Genres"
                range={50}
                max={200}
                click={handleClick}
            /> : <Loading />}
        </>
    );
}