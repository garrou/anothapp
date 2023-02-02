import { Card } from "react-bootstrap";
import { ApiCharacterPreview } from "../../models/external/ApiCharacterPreview";

interface Props {
    character: ApiCharacterPreview
}

export default function ApiCharacterCard({ character }: Props) {
    return (
        <Card className="mt-2">
            <Card.Body>
                {character.picture && <Card.Img variant="top" src={character.picture} />}
                <Card.Title>{character.actor}</Card.Title> 
                <Card.Subtitle>{character.name}</Card.Subtitle>
            </Card.Body>
        </Card>
    );
}