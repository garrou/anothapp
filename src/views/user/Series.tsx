import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Loading from "../../components/Loading";
import Navigation from "../../components/Navigation";
import ShowCard from "../../components/user/ShowCard";
import { ShowPreview } from "../../models/userShow/ShowPreview";
import showService from "../../services/showService";

export default function Series() {
    const [shows, setShows] = useState<ShowPreview[]>([]);
    const [isLoad, setIsLoad] = useState<boolean>(false);

    useEffect(() => {
        getShows();
    }, []);

    const getShows = async () => {
        const resp = await showService.getShows();

        if (resp.status === 200) {
            const data: Array<ShowPreview> = await resp.json();
            setIsLoad(false);
            setShows(data);
        }
    }

    return (
        <Container className="mb-3">
            <Navigation />

            {isLoad && <Loading />}

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