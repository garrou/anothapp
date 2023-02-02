import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ApiShowCard from "../../components/external/ApiShowCard";
import Loading from "../../components/Loading";
import Navigation from "../../components/Navigation";
import { ApiShowPreview } from "../../models/external/ApiShowPreview";
import searchService from "../../services/searchService";

export default function Discover() {
    const [shows, setShows] = useState<ApiShowPreview[]>([]);
    const [title, setTitle] = useState<string>('');
    const [isLoad, setIsLoad] = useState<boolean>(true);

    useEffect(() => {
        getShowsToDiscover();
    }, []);

    const getShowsToDiscover = async () => {
        const resp: Response = await searchService.discoverShows();

        if (resp.status === 200) {
            const data: Array<ApiShowPreview> = await resp.json();
            setIsLoad(false);
            setShows(data);
        }
    }

    const onClick = async () => {
        setShows([]);
        setIsLoad(true);
        const resp: Response = await searchService.searchShowByTitle(title);

        if (resp.status === 200) {
            const data: Array<ApiShowPreview> = await resp.json();
            setIsLoad(false);
            setShows(data);
        }
    }

    return (
        <Container className="mb-3">
            <Navigation url={'/discover/series'} />

            <Form className="mt-3">
                <Form.Group className="mb-3" controlId="titleSearch">
                    <Form.Label>Titre de la série</Form.Label>
                    <Form.Control type="text" placeholder="Titre" onChange={(e => setTitle(e.target.value))} required />
                </Form.Group>
                <Button variant="outline-dark" onClick={onClick}>Rechercher</Button>
            </Form>

            {isLoad && <Loading />}

            <Row xs={2} md={4} className="mt-4">
                {shows.map(s => (
                    <Col key={s.id} >
                        <ApiShowCard preview={s} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};