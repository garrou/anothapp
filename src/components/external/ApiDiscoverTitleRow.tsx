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
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [error, setError] = useState<ErrorMessage|null>(null);

    useEffect(() => {
        getShowsToDiscover("");
    }, []);

    const getShowsToDiscover = async (title: string) => {
        const resp: Response = await searchService.discoverShows(title);

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
        getShowsToDiscover(e.target.titleSearch.value);
    }
    
    return (
        <>
            <Form className="mt-3" onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="titleSearch">
                    <Form.Control type="text" placeholder="Titre de la série" required />
                </Form.Group>
                <Button variant="outline-dark" type="submit">Rechercher</Button>
            </Form>

            {isLoad && !error && <Loading />}

            {error && <AlertError message={error.message} />}

            <Row xs={2} md={3} lg={4} className="mt-4">
                {shows.map(s => (
                    <Col key={s.id} >
                        <ApiShowCard preview={s} />
                    </Col>
                ))}
            </Row>
        </>
    );
}

