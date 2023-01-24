import { Alert, Button, Card, Col, Container, Image, Row, Stack } from "react-bootstrap";
import { Details } from "../../models/show/Details";
import TextCard from "./TextCard";

interface Props {
    details: Details
};

export default function DetailsPage({ details }: Props) {
    const onClick = async () => {

    };

    return (
        <Container>
            <Image src={details.images.show} alt="Poster" fluid={true} />
            <Stack direction="horizontal" gap={2}>
                <h1 className="header">{details.title}</h1>
                <Button variant="outline-dark" onClick={onClick}>Ajouter</Button>
            </Stack>
            <p className="font-weight-bold">{details.seasons} saisons • {details.network}</p>

            <Alert variant={details.status === "Ended" ? "success" : "danger"}>
                {details.status === "Ended" ? "Terminée" : "En cours"}
            </Alert>
            <TextCard title="Création" text={details.creation} />
            <TextCard title="Note" text={`${details.note.toFixed(2)} / 5`} />
            <TextCard title="Synopsis" text={details.description} />
        </Container>
    );
};