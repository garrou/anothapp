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
}

interface ChartInfo {

    type: ChartType

    range: number

    color: string
}

export { type Chart, type ChartInfo, ChartType };