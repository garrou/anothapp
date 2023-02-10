import { useEffect, useState } from "react";
import { Card, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ApiShowKind } from "../../models/external/ApiShowKind";
import { ApiSimpleShow } from "../../models/external/ApiSimpleShow";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import searchService from "../../services/searchService";
import AlertError from "../AlertError";
import Loading from "../Loading";

export default function ApiDiscoverKindsSelect() {
    const [error, setError] = useState<ErrorMessage | null>(null);
    const [kinds, setKinds] = useState<ApiShowKind[]>([]);
    const [shows, setShows] = useState<ApiSimpleShow[]>([]);

    useEffect(() => {
        getKinds();
        handleChange('Comedy');
    }, []);

    const handleChange = async (kind: string) => {
        setShows([]);
        const resp = await searchService.getShowsByKind(kind);

        if (resp.status === 200) {
            const data: Array<ApiSimpleShow> = await resp.json();
            setShows(data);
        } else {
            setError(await resp.json());
        }
    }

    const getKinds = async () => {
        const resp = await searchService.getKinds();

        if (resp.status === 200) {
            const data = await resp.json();
            const transformed: Array<ApiShowKind> = Object.entries(data).map(e => new ApiShowKind(e[0], e[1] + ""));
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

            <Row xs={2} md={4} className="mt-3">
                {shows.map(s => (
                    <Card className="mt-2">
                        <Link to={`/discover/series/${s.id}`}>
                            {s.poster && <Card.Img variant="top" src={s.poster} />}
                        </Link>

                        <Card.Body>
                            <Card.Title>{s.title}</Card.Title>
                        </Card.Body>
                    </Card>
                ))}
            </Row>
        </>
    );
}