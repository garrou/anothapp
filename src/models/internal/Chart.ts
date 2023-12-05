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

    ratio: number

    max: number
}

interface ChartInfo {

    type: ChartType

    range: number
}

export { type Chart, type ChartInfo, ChartType };