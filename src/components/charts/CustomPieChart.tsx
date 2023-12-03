import { Card, Tooltip } from "react-bootstrap"
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"
import { Chart } from "../../models/internal/Chart"

const COLORS = [
    "#4287f5",
    "#329ea8",
    "#ae34eb",
    "#f5962a",
    "#0bb5b8",
    "#32a850",
    "#f54284",
    "#e0b067",
    "#f7a1b5",
    "#7bacb8"
]

export default function CustomPieChart(props: Chart) {
    return (
        <Card className="mt-2">
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart width={500} height={300}>
                        <Pie data={props.data} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={80}>
                            {
                                props.data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))
                            }
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" align="right" name={props.legend} />
                    </PieChart>
                </ResponsiveContainer>
            </Card.Body>
        </Card>
    )
}