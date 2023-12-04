import { ResponsiveContainer, CartesianGrid, Line, LineChart, XAxis, YAxis, Legend, Tooltip } from "recharts"
import { Chart } from "../../models/internal/Chart"

export default function CustomLineChart(props: Chart) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart width={500} height={300} data={props.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis ticks={Array.from({ length: props.data.length }, (_, i) => i * props.ratio)} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke={props.color} name={props.legend} />
            </LineChart>
        </ResponsiveContainer>
    )
}