import { Card } from "react-bootstrap";
import { ApiEpisodePreview } from "../../models/external/ApiEpisodePreview";

interface Props {
    episode: ApiEpisodePreview
}

export default function ApiEpisodeCard({ episode }: Props) {
    return (
        <Card className="mt-2">
            <Card.Body>
                <Card.Title>{episode.code} • {episode.title}</Card.Title> 
                <Card.Text>{episode.description}</Card.Text>
                <Card.Subtitle>{episode.date}</Card.Subtitle>
            </Card.Body>
        </Card>
    );
}