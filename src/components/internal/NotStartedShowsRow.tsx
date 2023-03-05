import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import { ShowPreview } from "../../models/internal/ShowPreview";
import showService from "../../services/showService";
import AlertError from "../AlertError";
import Loading from "../Loading";
import ShowCard from "./ShowCard";

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
        <>

            {isLoad && !error && <Loading />}

            {error && <AlertError message={error.message} />}

            <Row xs={2} md={3} lg={4}>
                {notStartedShows.map(s => (
                    <Col key={s.id} >
                        <ShowCard preview={s} />
                    </Col>
                ))}
            </Row>

        </>
    );
}