import { Accordion, Card, Form } from "react-bootstrap";
import { Chart, ChartType } from "../../../models/internal/Chart";
import CustomLineChart from "./CustomLineChart";
import CustomBarChart from "./CustomBarChart";
import { useEffect, useState } from "react";
import storageService from "../../../services/storageService";

export default function CustomChartWrapper(props: Chart) {
    const [type, setType] = useState(ChartType.Bar);
    const [range, setRange] = useState(props.range);
    const [color, setColor] = useState(props.color);
    const [isFirst, setIsFirst] = useState(true);

    useEffect(() => {
        if (isFirst) {
            const storedInfo = storageService.getChartInfo(props.id);
            if (storedInfo) {
                setType(storedInfo.type);
                setRange(storedInfo.range);
                setColor(storedInfo.color);
            }
            setIsFirst(false);
        } else {
            storageService.storeChartInfo(props.id, { type, range, color });
        }
    }, [type, range, color]);

    const displayChart = () => {
        switch (type) {
            case ChartType.Line:
                return <CustomLineChart id={props.id} color={color} title={props.title} data={props.data} legend={props.legend} range={range} max={props.max} click={props.click} />
            case ChartType.Bar:
                return <CustomBarChart id={props.id} color={color} title={props.title} data={props.data} legend={props.legend} range={range} max={props.max} click={props.click} />
            // case ChartType.Pie:
            //     return <CustomPieChart id={props.id} color={color} title={props.title} data={props.data} legend={props.legend} range={range} max={props.max} click={props.click} />
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
                                            onChange={() => setType(t)}
                                        />
                                    ))
                                }
                                <Form.Range value={range} onChange={(e) => setRange(parseInt(e.target.value))} max={props.max} />
                                {/* {type !== ChartType.Pie && <Form.Control
                                    type="color"
                                    id={`${props.id}-color  `}
                                    value={color}
                                    title="Choose your color"
                                    onChange={(e) => setColor(e.target.value)}
                                />} */}
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