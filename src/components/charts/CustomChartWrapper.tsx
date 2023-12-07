import { Accordion, Card, Form } from "react-bootstrap";
import { Chart, ChartInfo, ChartType } from "../../models/internal/Chart";
import CustomLineChart from "./CustomLineChart";
import CustomBarChart from "./CustomBarChart";
import CustomPieChart from "./CustomPieChart";
import { useEffect, useState } from "react";
import storageService from "../../services/storageService";

export default function CustomChartWrapper(props: Chart) {
    const [type, setType] = useState(ChartType.Bar);
    const [range, setRange] = useState(props.range);
    const [color, setColor] = useState(props.color);

    useEffect(() => {
        const savedInfo: ChartInfo = storageService.getChartInfo(props.id, props.range, props.color);

        if (savedInfo.type !== type || savedInfo.range !== range || savedInfo.color !== color)
            storageService.storeChartInfo(props.id, { type, range, color });
    }, [type, range, color]);

    const displayChart = () => {
        switch (type) {
            case "line":
                return <CustomLineChart id={props.id} color={color} title={props.title} data={props.data} legend={props.legend} range={range} max={props.max} />
            case "bar":
                return <CustomBarChart id={props.id} color={color} title={props.title} data={props.data} legend={props.legend} range={range} max={props.max} />
            case "pie":
                return <CustomPieChart id={props.id} color={color} title={props.title} data={props.data} legend={props.legend} range={range} max={props.max} />
        }
    }

    return (
        <Card className="mt-2">
            <Card.Body>
                <Accordion className="mb-2">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Personnaliser</Accordion.Header>
                        <Accordion.Body>
                            <Form className="mb-2" style={{ display: "inline-block" }}>
                                {
                                    Object.values(ChartType).map((t) => (
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
                                <Form.Range value={range} className="dark" onChange={(e) => setRange(parseInt(e.target.value))} max={props.max} />
                                <Form.Control
                                    type="color"
                                    id="color"
                                    defaultValue={props.color}
                                    title="Choose your color"
                                    onChange={(e) => setColor(e.target.value)}
                                />
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Card.Title>{props.title}</Card.Title>
                {displayChart()}
            </Card.Body>
        </Card >
    )
}