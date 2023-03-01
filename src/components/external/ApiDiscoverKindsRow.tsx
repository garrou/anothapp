import { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ApiShowKind } from "../../models/external/ApiShowKind";
import { ApiShowPreview } from "../../models/external/ApiShowPreview";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import searchService from "../../services/searchService";
import AlertError from "../AlertError";
import Loading from "../Loading";
import ApiShowCard from "./ApiShowCard";

export default function ApiDiscoverKindsRow() {
    const [error, setError] = useState<ErrorMessage | null>(null);
    const [kinds, setKinds] = useState<ApiShowKind[]>([]);
    const [shows, setShows] = useState<ApiShowPreview[]>([]);

    useEffect(() => {
        getKinds();
        handleChange('Comedy');
    }, []);

    const handleChange = async (kind: string) => {
        setShows([]);
        
        const resp = await searchService.getShowsByKind(kind);

        if (resp.status === 200) {
            const data: ApiShowPreview[] = await resp.json();
            setShows(data);
        } else {
            setError(await resp.json());
        }
    }

    const getKinds = async () => {
        const resp = await searchService.getKinds();

        if (resp.status === 200) {
            const data = await resp.json();
            const transformed: ApiShowKind[] = Object.entries(data).map(e => new ApiShowKind(e[0], e[1] + ""));
            setKinds(transformed);
        } else {
            setError(await resp.json());
        }
    }

    return (
        <>
            <Form.Select onChange={(e => handleChange(e.target.value))}>
                {kinds.map(k => <option key={k.value} value={k.value}>{k.name}</option>)}
            </Form.Select>

            {error && <AlertError message={error.message} />}

            {shows.length === 0 && !error && <Loading />}

            <Row xs={2} md={3} lg={4} className="mt-3">
                {shows.map(s => (
                    <Col key={s.id} >
                        <ApiShowCard preview={s} />
                    </Col>
                ))}
            </Row>
        </>
    );
}