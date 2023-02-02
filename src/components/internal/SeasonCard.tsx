import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SeasonPreview } from "../../models/internal/SeasonPreview";

interface Props {
    preview: SeasonPreview
    showId: number
};

export default function SeasonCard({ preview, showId }: Props) {
    return (
        <Card className="mt-2">
            <Link to={`/series/${showId}/seasons/${preview.number}`}>
                {preview.image && <Card.Img variant="top" src={preview.image} />}
            </Link>
            <Card.Body>
                <Card.Title>{`Saison : ${preview.number}`}</Card.Title>
                <Card.Subtitle>{`Episodes : ${preview.episode}`}</Card.Subtitle>
            </Card.Body>
        </Card>
    );
}