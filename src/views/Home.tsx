import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import GoogleButton from '../components/GoogleButton';
import Redirect from '../components/Redirect';
import PreviewCard from '../components/show/PreviewCard';
import type { Preview } from '../models/show/Preview';

export default function Home() {
    const [shows, setShows] = useState<Preview[]>([]);

    useEffect(() => {
        (async () => {
            const resp: Response = await fetch(`${process.env.REACT_APP_SERVER}/intro/images`, {
                credentials: 'include'
            });
            const data: Array<Preview> = await resp.json();
            setShows(data);
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
                        <Col key={s.showId} >
                            <PreviewCard preview={s} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};