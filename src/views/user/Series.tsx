import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import ShowCard from "../../components/userShow/ShowCard";
import { ShowPreview } from "../../models/userShow/ShowPreview";
import showService from "../../services/showService";

export default function Series() {
    const [shows, setShows] = useState<ShowPreview[]>([]);
    
    useEffect(() => {
        (async () => {
            const resp = await showService.getShows();

            if (resp.status === 200) {
                const data: Array<ShowPreview> = await resp.json();
                setShows(data);
            }
        })();
    }, []);

    return (
        <Container>
            <Navigation />

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