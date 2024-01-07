import { useEffect, useState } from "react";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import Loading from "../Loading";
import { errorToast } from "../../helpers/toasts";
import CustomChartWrapper from "./generics/CustomChartWrapper";
import { FriendProps } from "../../models/internal/FriendProps";

export default function TimeYearsChart(props: FriendProps) {
    const [timeByYears, setTimeByYears] = useState<Stat[]>([]);

    useEffect(() => {
        getTimeByYears();
    }, []);

    const getTimeByYears = async () => {
        const resp = await statService.getTimeByType("years", props.userId);

        if (resp.status === 200)
            setTimeByYears(await resp.json());
        else
            errorToast(await resp.json());
    }

    const handleClick = (data: any) => {
        console.log(data);
    }

    return (
        <>
            {timeByYears.length > 0 ? <CustomChartWrapper
                id="time-years-chart"
                color="#32a850"
                title="Temps par année"
                data={timeByYears}
                legend="Heures"
                range={300}
                max={1000}
                click={handleClick}
            /> : <Loading />}
        </>
    );
}