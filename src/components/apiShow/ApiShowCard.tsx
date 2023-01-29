import { useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ApiShowPreview } from "../../models/apiShow/ApiShowPreview";
import showService from "../../services/showService";

interface Props {
    preview: ApiShowPreview
};

export default function ApiShowCard({ preview }: Props) {
    const [error, setError] = useState<any>(undefined);
    const navigate = useNavigate();

    const onClick = async () => {
        const resp = await showService.addShow(preview);

        if (resp.status === 201) {
            navigate(`/series/${preview.id}`);
        } else {
            setError(await resp.json());
        }
    };

    return (
        <Card className="mt-2">
            <Link to={`/discover/series/${preview.id}`}>
                <Card.Img variant="top" src={preview.images.poster} />
            </Link>

            <Card.Body>
                <Card.Title>{preview.title}</Card.Title>
                <Button variant="outline-dark" onClick={onClick}>Ajouter</Button>

                {error && (
                    <Alert variant="danger" className="mt-2">
                        {error.message}
                    </Alert>
                )}
            </Card.Body>
        </Card>
    );
};