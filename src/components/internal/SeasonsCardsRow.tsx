import { Col, Row } from "react-bootstrap";
import { SeasonPreview } from "../../models/internal/SeasonPreview";
import SeasonCard from "./SeasonCard";

interface Props {
    showId: number,
    seasons: SeasonPreview[] | null
}

export default function SeasonsCardsRow({ showId, seasons }: Props) {

    return (
        <>
            <Row xs={2} md={3} lg={4} className="mt-4">
                {seasons && seasons.map(s => (
                    <Col key={s.number}>
                        <SeasonCard key={s.number} preview={s} showId={showId} />
                    </Col>
                ))}
            </Row>
        </>
    );
}