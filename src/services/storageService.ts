import { ChartInfo, isChartInfo } from "../models/internal/Chart";

const storeJwt = (token: string): void => localStorage.setItem('jwt', token);

const getJwt = (): string | null => localStorage.getItem('jwt') ?? "";

const deleteJwt = (): void => localStorage.removeItem('jwt');

const storeChartInfo = (id: string, info: ChartInfo): void => localStorage.setItem(id, JSON.stringify(info));

const getChartInfo = (id: string): ChartInfo | undefined => {
    const item = localStorage.getItem(id);
    if (!item) return undefined

    const obj = JSON.parse(item)
    if (isChartInfo(obj)) return obj;

    deleteChartInfo(id);
    return undefined;
}

const deleteChartInfo = (id: string): void => localStorage.removeItem(id);

const storeDisplayChart = (value: boolean): void => localStorage.setItem('dispChart', `${value}`);

const getDisplayChart = (): boolean => localStorage.getItem('displayChart') === "true";

export default {
    deleteJwt,
    getChartInfo,
    getDisplayChart,
    getJwt,
    storeChartInfo,
    storeDisplayChart,
    storeJwt
}