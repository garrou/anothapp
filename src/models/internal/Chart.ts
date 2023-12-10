import { Stat } from "./Stat"

enum ChartType {
    Line = "line",
    Bar = "bar",
    Pie = "pie",
}

interface Chart {

    id: string
    
    data: Stat[]

    title: string

    color: string

    legend: string

    range: number

    max: number

    click: (data: any) => void
}

interface ChartInfo {

    type: ChartType

    range: number

    color: string
}

const isChartInfo = (value: unknown) => {
    if (!value || typeof value !== "object") return false;
    const object = value as Record<string, unknown>
    return typeof object.type === "string"
        &&  typeof object.range === "number"
        && typeof object.color === "string";
}

export { type Chart, type ChartInfo, ChartType, isChartInfo };