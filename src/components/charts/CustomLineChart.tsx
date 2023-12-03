import { Card, Tooltip } from "react-bootstrap"
import { ResponsiveContainer, CartesianGrid, Line, LineChart, XAxis, YAxis, Legend } from "recharts"
import { Chart } from "../../models/internal/Chart"

export default function CustomLineChart(props: Chart) {
    return (
        <Card className="mt-2">
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart width={730} height={250} data={props.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke={props.color} name={props.legend} />
                    </LineChart>
                </ResponsiveContainer>
            </Card.Body>
        </Card>
    )
}