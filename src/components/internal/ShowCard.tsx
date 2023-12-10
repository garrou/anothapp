import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ShowPreview } from "../../models/internal/ShowPreview";

interface Props {
    preview: ShowPreview;
};

export default function ShowCard({ preview }: Props) {

    return (
        <Card className="mt-2">
            <Link to={`/series/${preview.id}`} style={{textDecoration: 'none', color: 'black'}}>
                <Card.Img variant="top" src={preview.poster} />
                <Card.Body>
                    <Card.Title>{preview.title}</Card.Title>
                </Card.Body>
            </Link>
        </Card>
    );
};