import { Card, Form } from "react-bootstrap";
import { Chart } from "../../models/internal/Chart";
import CustomLineChart from "./CustomLineChart";
import CustomBarChart from "./CustomBarChart";
import CustomPieChart from "./CustomPieChart";
import { useEffect, useState } from "react";

export default function CustomChartWrapper(props: Chart) {
    const [type, setType] = useState<string | null>(null);

    useEffect(() => {
        const savedType = localStorage.getItem(props.id);

        if (type && savedType !== type) {
            localStorage.setItem(props.id, type);
        } else {
            setType(savedType ?? "bar");
        }
    }, [type]);

    const displayChart = () => {
        switch (type) {
            case "line":
                return <CustomLineChart id={props.id} color={props.color} title={props.title} data={props.data} legend={props.legend} ratio={props.ratio} />
            case "bar":
                return <CustomBarChart id={props.id} color={props.color} title={props.title} data={props.data} legend={props.legend} ratio={props.ratio} />
            case "pie":
                return <CustomPieChart id={props.id} color={props.color} title={props.title} data={props.data} legend={props.legend} ratio={props.ratio} />
        }
    }

    return (
        <Card className="mt-2">
            <Card.Body>
                <Form className="mb-2">
                    {
                        ["line", "bar", "pie"].map((t) => (
                            <Form.Check
                                key={`${props.id}-${t}`}
                                checked={t === type}
                                inline
                                type="radio"
                                label={t}
                                name={`group-${props.id}`}
                                onChange={(_) => setType(t)}
                            />
                        ))
                    }
                </Form>
                <Card.Title>{props.title}</Card.Title>
                {displayChart()}
            </Card.Body>
        </Card>
    )
}