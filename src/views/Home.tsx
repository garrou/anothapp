import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Loading from "../components/Loading";
import searchService from "../services/searchService";
import { errorToast } from "../helpers/toasts";
import { ApiShowPreview } from "../models/external/ApiShow";

export default function Home() {
    const [shows, setShows] = useState<ApiShowPreview[]>([]);
    
    useEffect(() => {
        getImages();
    }, []);

    const getImages = async () => {
        const resp = await searchService.getHomeImages();

        if (resp.status === 200)
            setShows(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <Container className="p-3 text-center">
            <h1 className="header">Anothapp</h1>
            <p>Une autre application pour gérer les séries, les saisons et les épisodes visionnés.</p>

            <Button href="/login" variant="outline-dark">Se connecter</Button>

            <Row xs={2} md={3} lg={4} className="mt-4">
                {shows.length === 0 && <Loading />}

                {shows.map(s => (
                    <Col key={s.title} >
                        <Card className="mt-2">
                            {s.image && <Card.Img variant="top" src={s.image} />}
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};