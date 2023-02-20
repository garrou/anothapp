import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ApiShowPreview } from "../../models/external/ApiShowPreview";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import searchService from "../../services/searchService";
import AlertError from "../AlertError";
import Loading from "../Loading";
import ApiShowCard from "./ApiShowCard";

export default function ApiDiscoverTitleRow() {
    const [shows, setShows] = useState<ApiShowPreview[]>([]);
    const [title, setTitle] = useState<string>('');
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [error, setError] = useState<ErrorMessage|null>(null);

    useEffect(() => {
        getShowsToDiscover();
    }, []);

    const getShowsToDiscover = async () => {
        const resp: Response = await searchService.discoverShows();

        if (resp.status === 200) {
            const data: ApiShowPreview[] = await resp.json();
            setIsLoad(false);
            setShows(data);
        } else {
            setError(await resp.json());
        }
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();

        setShows([]);
        setIsLoad(true);
        
        const resp: Response = await searchService.getShowByTitle(title);

        if (resp.status === 200) {
            const data: ApiShowPreview[] = await resp.json();
            setIsLoad(false);
            setShows(data);
        } else {
            setError(await resp.json());
        }
    }
    
    return (
        <>
            <Form className="mt-3" onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="titleSearch">
                    <Form.Label>Titre de la série</Form.Label>
                    <Form.Control type="text" placeholder="Titre" onChange={(e => setTitle(e.target.value))} required />
                </Form.Group>
                <Button variant="outline-dark" type="submit">Rechercher</Button>
            </Form>

            {isLoad && !error && <Loading />}

            {error && <AlertError message={error.message} />}

            <Row xs={2} md={4} className="mt-4">
                {shows.map(s => (
                    <Col key={s.id} >
                        <ApiShowCard preview={s} />
                    </Col>
                ))}
            </Row>
        </>
    );
}

