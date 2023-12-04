import { Stat } from "./Stat"

interface Chart {

    id: string
    
    data: Stat[]

    title: string

    color: string

    legend: string

    ratio: number
}

export type { Chart };