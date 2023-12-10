import { Button, Card } from "react-bootstrap";
import { ApiShowDetails } from "../../models/external/ApiShowDetails";
import { SeasonPreview } from "../../models/internal/SeasonPreview";
import showService from "../../services/showService";
import { errorToast, successToast } from "../../helpers/toasts";

interface Props {

    preview: SeasonPreview;
    
    show: ApiShowDetails;
    
    notify: () => void;
};

export default function ApiSeasonCard({ preview, show, notify }: Props) {

    const onClick = async () => {
        const resp = await showService.addSeason(show, preview);

        if (resp.status === 201) {
            successToast("Saison ajoutée");
            notify();
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <>
            <Card className="mt-2">
                <Card.Body>
                    {preview.image && <Card.Img variant="top" src={preview.image} />}
                    <Card.Title>{`Saison ${preview.number}`}</Card.Title>
                    <Card.Subtitle>{`Episodes : ${preview.episode}`}</Card.Subtitle>
                    <Button variant="outline-dark mt-2" onClick={onClick}>
                        <i className="bi-plus"></i>
                    </Button>
                </Card.Body>
            </Card >
        </>
    );
}