import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import GoogleButton from '../components/GoogleButton';
import Redirect from '../components/Redirect';
import ApiMiniShowCard from '../components/external/ApiMiniShowCard';
import type { ApiShowPreview } from '../models/external/ApiShowPreview';
import Loading from '../components/Loading';
import AlertError from '../components/AlertError';
import { ErrorMessage } from '../models/internal/ErrorMessage';

export default function Home() {
    const [shows, setShows] = useState<ApiShowPreview[]>([]);
    const [error, setError] = useState<ErrorMessage|null>(null);

    useEffect(() => {
        (async () => {
            const resp: Response = await fetch(`${process.env.REACT_APP_SERVER}/intro/images`, {
                credentials: 'include'
            });

            if (resp.status === 200) {
                const data: Array<ApiShowPreview> = await resp.json();
                setShows(data);
            } else {
                setError(await resp.json());
            }
        })();
    }, []);

    return (
        <>
            <Redirect />

            <Container className='p-3 text-center'>
                <h1 className='header'>Anothapp</h1>
                <p>Une autre application pour gérer les séries, les saisons et les épisodes visionnés.</p>

                <GoogleButton />

                {error && <AlertError message={error.message} />}

                <Row xs={2} md={4} className="mt-4">
                    {shows.length === 0 && !error && <Loading />}

                    {shows.map(s => (
                        <Col key={s.id} >
                            <ApiMiniShowCard preview={s} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};