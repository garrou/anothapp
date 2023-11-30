import { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import type { ApiShowPreview } from '../models/external/ApiShowPreview';
import Loading from '../components/Loading';
import CustomAlert from '../components/CustomAlert';
import { ErrorMessage } from '../models/internal/ErrorMessage';
import searchService from '../services/searchService';
import { getImageUrl } from '../models/external/ApiShowImage';

export default function Home() {
    const [shows, setShows] = useState<ApiShowPreview[]>([]);
    const [error, setError] = useState<ErrorMessage | null>(null);

    useEffect(() => {
        getImages();
    }, []);

    const getImages = async () => {
        const resp = await searchService.getHomeImages();

        if (resp.status === 200) {
            const data: ApiShowPreview[] = await resp.json();
            setShows(data);
        } else {
            setError(await resp.json());
        }
    }

    return (
        <Container className='p-3 text-center'>
            <h1 className='header'>Anothapp</h1>
            <p>Une autre application pour gérer les séries, les saisons et les épisodes visionnés.</p>

            <Button href='/login' variant='outline-dark'>Se connecter</Button>

            {error && <CustomAlert variant="danger" message={error.message} />}

            <Row xs={2} md={3} lg={4} className="mt-4">
                {shows.length === 0 && !error && <Loading />}

                {shows.map(s => (
                    <Col key={s.id} >
                        <Card className="mt-2">
                            {getImageUrl(s.images) && <Card.Img variant="top" src={getImageUrl(s.images)!} />}

                            <Card.Body>
                                <Card.Title>{s.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};