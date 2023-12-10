import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Chart } from "../../../models/internal/Chart";

export default function CustomBarChart(props: Chart) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart width={500} height={300} data={props.data}>
                <XAxis dataKey="label" />
                <YAxis type="number" ticks={Array.from({ length: props.data.length }, (_, i) => i * props.range)} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill={props.color} stroke={props.color} name={props.legend} onClick={props.click} />
            </BarChart>
        </ResponsiveContainer>
    )
}