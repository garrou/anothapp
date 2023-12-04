import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Chart } from "../../models/internal/Chart";

export default function CustomBarChart(props: Chart) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart className="mt-3" width={500} height={300} data={props.data}>
                <XAxis dataKey="label" />
                <YAxis type="number" domain={[0, props.max]} allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill={props.color} stroke={props.color} name={props.legend} />
            </BarChart>
        </ResponsiveContainer>
    )
}