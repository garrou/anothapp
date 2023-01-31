import { useEffect, useState } from "react";
import { Col, Row, useAccordionButton } from "react-bootstrap";
import { SeasonPreview } from "../../models/userShow/SeasonPreview";
import showService from "../../services/showService";
import Loading from "../Loading";
import SeasonCard from "./SeasonCard";

interface Props {
    showId: number
}

export default function SeasonsCardsRow({ showId }: Props) {
    const [seasons, setSeasons] = useState<SeasonPreview[]>([]);

    useEffect(() => {
        getSeasons();
    }, []);


    const getSeasons = async () => {
        const resp = await showService.getSeasonsByShow(showId);

        if (resp.status === 200) {
            const data: Array<SeasonPreview> = await resp.json();
            setSeasons(data);
        }
    }

    return (
        <>
            {seasons.length === 0 && <Loading />}

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