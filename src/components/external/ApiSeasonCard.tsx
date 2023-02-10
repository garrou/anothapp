import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { ApiShowDetails } from "../../models/external/ApiShowDetails";
import { SeasonPreview } from "../../models/internal/SeasonPreview";
import showService from "../../services/showService";
import AlertError from "../AlertError";

interface Props {
    preview: SeasonPreview
    show: ApiShowDetails
};

export default function ApiSeasonCard({ preview, show }: Props) {
    const [error, setError] = useState<any>(null);

    const onClick = async () => {
        const resp = await showService.addSeason(show, preview);

        if (resp.status === 201) {
            window.location.reload();
        } else {
            setError(await resp.json());
        }
    }

    return (
        <>
            {error && <AlertError message={error.message} />}
            
            <Card className="mt-2">
                <Card.Body>
                    {preview.image && <Card.Img variant="top" src={preview.image} />}
                    <Card.Title>{`Saison ${preview.number}`}</Card.Title>
                    <Card.Subtitle>{`Episodes : ${preview.episode}`}</Card.Subtitle>
                    <Button variant="outline-dark" onClick={onClick} className="mt-2">Ajouter</Button>
                </Card.Body>
            </Card>
        </>
    );
}