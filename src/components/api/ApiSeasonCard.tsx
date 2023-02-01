import { Button, Card } from "react-bootstrap";
import { ApiShowDetails } from "../../models/apiShow/ApiShowDetails";
import { SeasonPreview } from "../../models/userShow/SeasonPreview";
import showService from "../../services/showService";

interface Props {
    preview: SeasonPreview
    show: ApiShowDetails
};

export default function ApiSeasonCard({ preview, show }: Props) {
    const onClick = async () => {
        const resp = await showService.addSeason(show, preview);

        if (resp.status === 201) {
            window.location.reload();
        }
    }

    return (
        <Card className="mt-2">
            <Card.Body>
                {preview.image && <Card.Img variant="top" src={preview.image} />}
                <Card.Title>{`Saison ${preview.number}`}</Card.Title> 
                <Card.Subtitle>{`Episodes : ${preview.episode}`}</Card.Subtitle>
                <Button variant="outline-dark" onClick={onClick} className="mt-2">Ajouter</Button>
            </Card.Body>
        </Card>
    );
}