import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ApiShowCard from "../../components/apiShow/ApiShowCard";
import Navigation from "../../components/Navigation";
import { ApiShowPreview } from "../../models/apiShow/ApiShowPreview";

export default function Discover() {
    const [shows, setShows] = useState<ApiShowPreview[]>([]);
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        (async () => {
            const resp: Response = await fetch(`${process.env.REACT_APP_SERVER}/search/shows/discover`, {
                credentials: 'include'
            });

            if (resp.status === 200) {
                const data: Array<ApiShowPreview> = await resp.json();
                setShows(data);
            }
        })();
    }, []);

    const onClick = async () => {
        const resp: Response = await fetch(`${process.env.REACT_APP_SERVER}/search/shows/titles/${title}`, {
            credentials: 'include'
        });

        if (resp.status === 200) {
            const data: Array<ApiShowPreview> = await resp.json();
            setShows(data);
        }
    }

    return (
        <Container>
            <Navigation />

            <Form className="mt-3">
                <Form.Group className="mb-3" controlId="titleSearch">
                    <Form.Label>Titre de la série</Form.Label>
                    <Form.Control type="text" placeholder="Titre" onChange={(e => setTitle(e.target.value))} required />
                </Form.Group>
                <Button variant="outline-dark" onClick={onClick}>Rechercher</Button>
            </Form>

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