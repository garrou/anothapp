export type ChartGroupedType = "seasons" | "episodes" | "kinds";

export type ChartGroupedPeriod = "years" | "year" | "months";

export type ChartTimeType = "total" | "years" | "month" | "best-month" | "rank";

export type ChartCountType = "shows" | "episodes" | "seasons";

export interface Stat {

    label: string;

    value: number;
}

export enum ChartType {
    Line = "line",

    Bar = "bar",
}

export interface Chart {

    id: string
    
    data: Stat[]

    title: string

    color: string

    legend: string

    range: number

    max: number

    click: (event: any, payload: any) => void 
}

export interface ChartSelection {

    title: string;

    label: string;
}

export interface ChartInfo {

    type: ChartType

    range: number

    color: string
}

export const isChartInfo = (value: unknown) => {
    if (!value || typeof value !== "object") return false;
    const object = value as Record<string, unknown>
    return typeof object.type === "string"
        &&  typeof object.range === "number"
        && typeof object.color === "string";
}