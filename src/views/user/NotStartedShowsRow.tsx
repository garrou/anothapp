import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import { ShowPreview } from "../../models/internal/ShowPreview";
import showService from "../../services/showService";
import AlertError from "../../components/AlertError";
import Loading from "../../components/Loading";
import ShowCard from "../../components/internal/ShowCard";
import Navigation from "../../components/Navigation";

export default function NotStartedShowsRow() {
    const [notStartedShows, setNotStartedShows] = useState<ShowPreview[]>([]);
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [error, setError] = useState<ErrorMessage|null>(null);

    useEffect(() => {
        getNotStartedShows();
    }, []);

    const getNotStartedShows = async () => {
        const resp = await showService.getNotStartedShows();

        if (resp.status === 200) {
            const data: ShowPreview[] = await resp.json();
            setNotStartedShows(data);
            setIsLoad(false);
        } else {
            setError(await resp.json());
        }
    }

    return (
        <Container>
            <Navigation url={'/not-started'} />

            {isLoad && !error && <Loading />}

            {error && <AlertError message={error.message} />}

            <Row xs={2} md={3} lg={4}>
                {notStartedShows.map(s => (
                    <Col key={s.id} >
                        <ShowCard preview={s} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}