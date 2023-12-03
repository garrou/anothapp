import { Stat } from "./Stat"

interface Chart {
    
    data: Stat[]

    title: string

    color: string

    legend: string

    max: number
}

export type { Chart };