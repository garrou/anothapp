import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import GoogleButton from '../components/GoogleButton';
import Redirect from '../components/Redirect';
import PreviewCard from '../components/apiShow/ApiShowCard';
import type { ApiShowPreview } from '../models/apiShow/ApiShowPreview';

export default function Home() {
    const [shows, setShows] = useState<ApiShowPreview[]>([]);

    useEffect(() => {
        (async () => {
            const resp: Response = await fetch(`${process.env.REACT_APP_SERVER}/intro/images`, {
                credentials: 'include'
            });

            if (resp.status === 200) {
                const data: Array<ApiShowPreview> = await resp.json();
                setShows(data);
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

                <Row xs={2} md={4} className="mt-4">
                    {shows.map(s => (
                        <Col key={s.id} >
                            <PreviewCard preview={s} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};