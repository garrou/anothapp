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

        if (resp.status === 200) {
            setKinds(await resp.json());
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <>
            {kinds.length === 0 && <Loading />}

            {kinds.length > 0 && <CustomChartWrapper 
                id="kinds-chart"
                color="#329ea8" 
                title="10 genres les plus regardés" 
                data={kinds} 
                legend="Genres"
                max={300}
            />}
        </>
    );
}