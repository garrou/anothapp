import { ChartInfo, ChartType } from "../models/internal/Chart";

const storeJwt = (token: string) => {
    localStorage.setItem('jwt', token);
}

const getJwt = (): string | null => localStorage.getItem('jwt') ?? "";

const deleteJwt = () => localStorage.removeItem('jwt');

const storeChartInfo = (id: string, info: ChartInfo) => {
    localStorage.setItem(id, JSON.stringify(info));
}

const getChartInfo = (id: string, range: number, color: string): ChartInfo => {
    try {
        return JSON.parse(localStorage.getItem(id) ?? "{}");
    } catch (_) {
        deleteChartInfo(id);
    }   
    return { type: ChartType.Bar, range, color }; 
}

const deleteChartInfo = (id: string) => localStorage.removeItem(id);

export default {
    deleteJwt,
    getChartInfo,
    getJwt,
    storeChartInfo,
    storeJwt
}