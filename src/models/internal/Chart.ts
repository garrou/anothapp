import { Stat } from "./Stat"

interface Chart {

    id: string
    
    data: Stat[]

    title: string

    color: string

    legend: string

    ratio: number

    max: number
}

export type { Chart };