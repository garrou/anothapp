import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Loading from "../../components/Loading";
import Navigation from "../../components/Navigation";
import ShowCard from "../../components/internal/ShowCard";
import { ShowPreview } from "../../models/internal/ShowPreview";
import showService from "../../services/showService";
import AlertError from "../../components/AlertError";

export default function Series() {
    const [shows, setShows] = useState<ShowPreview[]>([]);
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        getShows();
    }, []);

    const getShows = async () => {
        const resp = await showService.getShows();

        if (resp.status === 200) {
            const data: Array<ShowPreview> = await resp.json();
            setIsLoad(false);
            setShows(data);
        } else {
            setError(await resp.json());
        }
    }

    // TODO: Search by title

    return (
        <Container className="mb-3">
            <Navigation url={'/series'} />

            {isLoad && !error && <Loading />}

            {error && <AlertError message={error.message} />}

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