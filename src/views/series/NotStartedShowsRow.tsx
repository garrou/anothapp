import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ShowPreview } from "../../models/internal/ShowPreview";
import showService from "../../services/showService";
import Loading from "../../components/Loading";
import ShowCard from "../../components/internal/ShowCard";
import Navigation from "../../components/Navigation";
import { errorToast } from "../../helpers/toasts";

export default function NotStartedShowsRow() {
    const [notStartedShows, setNotStartedShows] = useState<ShowPreview[]>([]);
    const [isLoad, setIsLoad] = useState(true);

    useEffect(() => {
        getNotStartedShows();
    }, []);

    const getNotStartedShows = async () => {
        const resp = await showService.getNotStartedShows();

        if (resp.status === 200) {
            setNotStartedShows(await resp.json());
            setIsLoad(false);
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <Container>
            <Navigation />

            {isLoad && <Loading />}

            {notStartedShows.length === 0 && <p className="text-center mt-3">Aucune série à voir</p>}

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