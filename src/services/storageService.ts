import { ChartInfo, isChartInfo } from "../models/internal/Chart";

const storeJwt = (token: string) => {
    localStorage.setItem('jwt', token);
}

const getJwt = (): string | null => localStorage.getItem('jwt') ?? "";

const deleteJwt = () => localStorage.removeItem('jwt');

const storeChartInfo = (id: string, info: ChartInfo) => {
    localStorage.setItem(id, JSON.stringify(info));
}

const getChartInfo = (id: string): ChartInfo | undefined => {
    const item = localStorage.getItem(id);
    if (!item) return undefined

    const obj = JSON.parse(item)
    if (isChartInfo(obj)) return obj;

    deleteChartInfo(id);
    return undefined;
}

const deleteChartInfo = (id: string) => localStorage.removeItem(id);

export default {
    deleteJwt,
    getChartInfo,
    getJwt,
    storeChartInfo,
    storeJwt
}