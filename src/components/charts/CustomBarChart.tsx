import { Card } from "react-bootstrap";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
    data: any[]

    title: string

    ratio: number

    color: string

    legend: string
}

export default function CustomBarChart(props: Props) {
    return (
        <Card className="mt-2">
            <Card.Body>
                <Card.Title>{ props.title }</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart className="mt-3" width={250} height={300} data={props.data}>
                        <XAxis dataKey="label" />
                        <YAxis ticks={Array.from(props.data, (e) => Math.round(e.value / props.ratio) * props.ratio)} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill={props.color} stroke={props.color} name={props.legend} />
                    </BarChart>
                </ResponsiveContainer>
            </Card.Body>
        </Card>
    )
}