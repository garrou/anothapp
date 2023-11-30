import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import { useState, useEffect } from "react";
import AlertError from "../../components/AlertError";
import Loading from "../../components/Loading";
import ApiShowCard from "../../components/external/ApiShowCard";
import ShowCard from "../../components/internal/ShowCard";
import { ApiShowPreview } from "../../models/external/ApiShowPreview";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import { ShowPreview } from "../../models/internal/ShowPreview";
import showService from "../../services/showService";

export default function Series() {

    const [shows, setShows] = useState<ShowPreview[]>([]);
    const [newShows, setNewShows] = useState<ApiShowPreview[]>([]);
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [error, setError] = useState<ErrorMessage | null>(null);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        getShows(search);
    }, [search]);

    const getShows = async (title: string) => {
        const resp = await showService.getShows(title);

        if (resp.status === 200) {
            const data = await resp.json();
            setIsLoad(false);
            
            if (data.length > 0 && data[0].images) {
                setNewShows(data);
            } else {
                setShows(data);
            }
        } else {
            setError(await resp.json());
        }
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setSearch(e.target.titleSearch.value);
    }

    return (
        <Container className="mb-3">
            <Navigation url={'/series'} />

            {isLoad && !error && <Loading />}

            {error && <AlertError message={error.message} />}

            <Form className="mt-3" onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="titleSearch">
                    <Form.Control type="text" placeholder="Titre de la série" />
                </Form.Group>
                <Button variant="outline-dark" type="submit">Rechercher</Button>
            </Form>

            {shows.length === 0 && newShows.length === 0 && <p className="text-center mt-3">Aucune série</p>}

            <Row xs={2} md={3} lg={4}>
                {shows.length !== 0 && shows.map(s => (
                    <Col key={s.id} >
                        <ShowCard preview={s} />
                    </Col>
                ))}
                {newShows.length !== 0 && newShows.map(s => (
                    <Col key={s.id} >
                        <ApiShowCard preview={s} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};