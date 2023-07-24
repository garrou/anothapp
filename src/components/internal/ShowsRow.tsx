import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import { ShowPreview } from "../../models/internal/ShowPreview";
import showService from "../../services/showService";
import AlertError from "../AlertError";
import Loading from "../Loading";
import ShowCard from "./ShowCard";
import { ApiShowPreview } from "../../models/external/ApiShowPreview";
import ApiShowCard from "../external/ApiShowCard";

export default function ShowsRow() {
    const [shows, setShows] = useState<ShowPreview[]>([]);
    const [newShows, setNewShows] = useState<ApiShowPreview[]>([]);
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [error, setError] = useState<ErrorMessage | null>(null);

    useEffect(() => {
        getShows("");
    }, []);

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
        setShows([]);
        getShows(e.target.titleSearch.value);
    }

    return (
        <>
            {isLoad && !error && <Loading />}

            {error && <AlertError message={error.message} />}

            <Form className="mt-3" onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="titleSearch">
                    <Form.Label>Titre de la série</Form.Label>
                    <Form.Control type="text" placeholder="Titre" />
                </Form.Group>
                <Button variant="outline-dark" type="submit">Rechercher</Button>
            </Form>

            {shows.length === 0 && newShows.length === 0 && <p>Aucune série</p>}

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
        </>
    );
}