import { Card } from "react-bootstrap";
import { Preview } from "../../models/show/Preview";

export default function PreviewCard(preview: Preview) {
    return (
        <Card className="mt-2">
            <Card.Img variant="top" src={preview.poster} />
            <Card.Body>
                <Card.Title>{preview.title}</Card.Title>
            </Card.Body>
        </Card>
    );
};