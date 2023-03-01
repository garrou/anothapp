import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Loading from "../../components/Loading";
import Navigation from "../../components/Navigation";
import ShowCard from "../../components/internal/ShowCard";
import { ShowPreview } from "../../models/internal/ShowPreview";
import showService from "../../services/showService";
import AlertError from "../../components/AlertError";
import { ErrorMessage } from "../../models/internal/ErrorMessage";

export default function Series() {
    const [shows, setShows] = useState<ShowPreview[]>([]);
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [error, setError] = useState<ErrorMessage | null>(null);

    useEffect(() => {
        getShows();
    }, []);

    const getShows = async () => {
        const resp = await showService.getShows(10);

        if (resp.status === 200) {
            const data: ShowPreview[] = await resp.json();
            setIsLoad(false);
            setShows(data);
        } else {
            setError(await resp.json());
        }
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();

        setShows([]);

        const title: string = e.target.titleSearch.value;
        const resp = await showService.getShowsByTitle(title);

        if (resp.status === 200) {
            const data: ShowPreview[] = await resp.json();
            setShows(data);
        } else {
            setError(await resp.json());
        }
    }

    return (
        <Container className="mb-3">
            <Navigation url={'/series'} />

            {isLoad && !error && <Loading />}

            {error && <AlertError message={error.message} />}

            <Form className="mt-3" onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="titleSearch">
                    <Form.Label>Titre de la série</Form.Label>
                    <Form.Control type="text" placeholder="Titre" required />
                </Form.Group>
                <Button variant="outline-dark" type="submit">Rechercher</Button>
            </Form>

            <Row xs={2} md={3} lg={4} className="mt-4">
                {shows.map(s => (
                    <Col key={s.id} >
                        <ShowCard preview={s} />
                    </Col>
                ))}
            </Row>

            <Button className="my-3" variant="outline-dark">Plus de séries</Button>
        </Container>
    );
};