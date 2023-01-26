import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import ShowCard from "../../components/show/ShowCard";
import { Preview } from "../../models/show/Preview";

export default function Series() {
    const [shows, setShows] = useState<Preview[]>([]);
    
    useEffect(() => {
        (async () => {
            const resp: Response = await fetch(`${process.env.REACT_APP_SERVER}/shows`, {
                credentials: 'include'
            });

            if (resp.status === 200) {
                const data: Array<Preview> = await resp.json();
                setShows(data);
            }
        })();
    }, []);

    return (
        <Container>
            <Navigation />

            <Button href="/search/shows" variant="outline-dark" className="mt-2">Ajouter une série</Button>

            <Row xs={2} md={4} className="mt-4">
                {shows.map(s => (
                    <Col key={s.id} >
                        <ShowCard preview={s} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};