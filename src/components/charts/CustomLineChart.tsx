import { ResponsiveContainer, CartesianGrid, Line, LineChart, XAxis, YAxis, Legend, Tooltip } from "recharts"
import { Chart } from "../../models/internal/Chart"

export default function CustomLineChart(props: Chart) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart width={730} height={250} data={props.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" domain={[0, props.max]} allowDecimals={false} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke={props.color} name={props.legend} />
            </LineChart>
        </ResponsiveContainer>
    )
}