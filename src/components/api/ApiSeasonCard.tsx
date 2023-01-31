import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SeasonPreview } from "../../models/userShow/SeasonPreview";
import showService from "../../services/showService";

interface Props {
    preview: SeasonPreview
    showId: string
};

export default function ApiSeasonCard({ preview, showId }: Props) {
    const navigate = useNavigate();

    const onClick = async () => {
        const resp = await showService.addSeason(Number(showId), preview);

        if (resp.status === 201) {
            navigate(`/series/${showId}`);
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