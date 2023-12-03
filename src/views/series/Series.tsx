import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import ApiShowCard from "../../components/external/ApiShowCard";
import ShowCard from "../../components/internal/ShowCard";
import { ApiShowPreview } from "../../models/external/ApiShowPreview";
import { ShowPreview } from "../../models/internal/ShowPreview";
import showService from "../../services/showService";
import { errorToast } from "../../helpers/toasts";

export default function Series() {

    const [shows, setShows] = useState<ShowPreview[]>([]);
    const [newShows, setNewShows] = useState<ApiShowPreview[]>([]);
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [limit, setLimit] = useState<number>(20);

    useEffect(() => {
        getShows();
    }, [search, limit]);

    const resetShows = () => {
        setShows([]);
        setNewShows([]);
        setIsLoad(true);
    }

    const getShows = async () => {
        resetShows();
        const resp = await showService.getShows(search, limit);

        if (resp.status === 200) {
            const data = await resp.json();
            setIsLoad(false);

            if (data.length !== 0 && data[0].images) {
                setNewShows(data);
            } else {
                setShows(data);
            }
        } else {
            errorToast(await resp.json());
        }
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setSearch(e.target.titleSearch.value);
    }

    return (
        <Container className="mb-3">
            <Navigation url={'/series'} />

            {isLoad && <Loading />}

            <Form className="my-3" onSubmit={onSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="titleSearch">
                            <Form.Control type="text" placeholder="Titre de la série" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button variant="outline-dark" type="submit">Rechercher</Button>
                    </Col>
                </Row>
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

            {shows.length !== 0 && !search &&
                <div className="text-center mt-2">
                    <Button variant="outline-dark" onClick={() => setLimit(limit + 10)}>
                        Voir plus
                    </Button>
                </div>
            }
        </Container>
    );
};