import { ChartInfo, isChartInfo } from "../models/internal/Chart";

const JWT = "jwt";

const DISPLAY_CHART = "displayChart";

const storeJwt = (token: string): void => localStorage.setItem(JWT, token);

const getJwt = (): string | null => localStorage.getItem(JWT) ?? "";

const deleteJwt = (): void => localStorage.removeItem(JWT);

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

const storeDisplayChart = (value: boolean): void => localStorage.setItem(DISPLAY_CHART, `${value}`);

const getDisplayChart = (): boolean => localStorage.getItem(DISPLAY_CHART) === "true";

export default {
    deleteJwt,
    getChartInfo,
    getDisplayChart,
    getJwt,
    storeChartInfo,
    storeDisplayChart,
    storeJwt
}