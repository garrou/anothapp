import { Button, Card } from "react-bootstrap";
import { Preview } from "../../models/show/Preview";

interface Props {
    preview: Preview
};

export default function ShowCard({preview}: Props) {
    return (
        <Card className="mt-2">
            <Card.Img variant="top" src={preview.poster} />
            <Card.Body>
                <Card.Title>{preview.title}</Card.Title>
                <Button href={`/search/shows/${preview.id}`} variant="outline-dark">Détails</Button>
            </Card.Body>
        </Card>
    );
};