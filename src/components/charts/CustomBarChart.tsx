import { Card } from "react-bootstrap";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
    data: any[]

    title: string

    color: string

    legend: string

    max: number
}

export default function CustomBarChart(props: Props) {
    return (
        <Card className="mt-2">
            <Card.Body>
                <Card.Title>{ props.title }</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart className="mt-3" width={250} height={300} data={props.data}>
                        <XAxis dataKey="label" />
                        <YAxis type="number" domain={[0, props.max]} allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill={props.color} stroke={props.color} name={props.legend} />
                    </BarChart>
                </ResponsiveContainer>
            </Card.Body>
        </Card>
    )
}