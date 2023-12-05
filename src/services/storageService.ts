import { ChartInfo, ChartType } from "../models/internal/Chart";

const storeJwt = (token: string) => {
    localStorage.setItem('jwt', token);
}

const getJwt = (): string | null => localStorage.getItem('jwt') ?? "";

const deleteJwt = () => localStorage.removeItem('jwt');

const storeChartInfo = (id: string, type: ChartType, range: number) => {
    localStorage.setItem(id, JSON.stringify({ type, range }));
}

const getChartInfo = (id: string): ChartInfo => JSON.parse(localStorage.getItem(id) ?? "{}");

export default {
    deleteJwt,
    getChartInfo,
    getJwt,
    storeChartInfo,
    storeJwt
}