import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getImageUrl } from "../../models/external/ApiShowImage";
import { ApiShowPreview } from "../../models/external/ApiShowPreview";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import showService from "../../services/showService";
import CustomAlert from "../CustomAlert";

interface Props {
    preview: ApiShowPreview
};

export default function ApiShowCard({ preview }: Props) {
    const [error, setError] = useState<ErrorMessage | null>(null);
    const navigate = useNavigate();
    const image = getImageUrl(preview.images);

    const onClick = async () => {
        const resp = await showService.addShow(preview);

        if (resp.status === 201) {
            navigate(`/series/${preview.id}`);
        } else {
            setError(await resp.json());
        }
    };

    return (
        <Link to={`/add-series/${preview.id}`} style={{textDecoration: 'none', color: 'black'}}>
            <Card className="mt-2">
                {image && <Card.Img variant="top" src={image} />}
                <Card.Body>
                    <Card.Title>{preview.title}</Card.Title>
                    <Button variant="outline-dark" onClick={onClick}>Ajouter</Button>

                    {error && <CustomAlert variant="danger" message={error.message} />}
                </Card.Body>
            </Card>
        </Link>
    );
};