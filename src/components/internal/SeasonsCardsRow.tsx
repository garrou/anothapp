import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { SeasonPreview } from "../../models/internal/SeasonPreview";
import showService from "../../services/showService";
import AlertError from "../AlertError";
import Loading from "../Loading";
import SeasonCard from "./SeasonCard";

interface Props {
    showId: number
}

export default function SeasonsCardsRow({ showId }: Props) {
    const [seasons, setSeasons] = useState<SeasonPreview[]>([]);
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        getSeasons();
    }, []);


    const getSeasons = async () => {
        const resp = await showService.getSeasonsByShow(showId);

        if (resp.status === 200) {
            const data: Array<SeasonPreview> = await resp.json();
            setIsLoad(false);
            setSeasons(data);
        } else {
            setError(await resp.json());
        }
    }

    return (
        <>
            {isLoad && !error && <Loading />}

            {error && <AlertError message={error.message} />}

            <Row xs={2} md={4} className="mt-4">
                {seasons.map(s => (
                    <Col key={s.number}>
                        <SeasonCard key={s.number} preview={s} showId={showId} />
                    </Col>
                ))}
            </Row>
        </>
    );
}