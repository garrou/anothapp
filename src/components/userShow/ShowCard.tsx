import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ShowPreview } from "../../models/userShow/ShowPreview";

interface Props {
    preview: ShowPreview
};

export default function ShowCard({ preview }: Props) {
    return (
        <Card className="mt-2">
            <Link to={`/series/${preview.id}`}>
                <Card.Img variant="top" src={preview.poster} />
            </Link>
            <Card.Body>
                <Card.Title>{preview.title}</Card.Title>
            </Card.Body>
        </Card>
    );
};