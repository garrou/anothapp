import { Card } from "react-bootstrap";
import { ApiShowPreview } from "../../models/external/ApiShowPreview";

interface Props {
    preview: ApiShowPreview
};

export default function ApiMiniShowCard({ preview }: Props) {
    
    return (
        <Card className="mt-2">
            <Card.Img variant="top" src={preview.images.poster} />

            <Card.Body>
                <Card.Title>{preview.title}</Card.Title>
            </Card.Body>
        </Card>
    );
};