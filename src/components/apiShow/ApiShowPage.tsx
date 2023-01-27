import { useState } from "react";
import { Alert, Button, Container, Image, Stack } from "react-bootstrap";
import { ApiShowDetails } from "../../models/apiShow/ApiShowDetails";
import { addShow } from "../../services/showService";
import TextCard from "./TextCard";

interface Props {
    details: ApiShowDetails
};

export default function ApiShowPage({ details }: Props) {
    const [error, setError] = useState<any>(undefined);
    const [success, setSuccess] = useState<any>(undefined);

    const onClick = async () => {
        const resp = await addShow(details);

        if (resp.status === 201) {
            setSuccess(await resp.json());
        } else {
            setError(await resp.json());
        }
    };

    return (
        <Container>
            {success && (
                <Alert variant="success">
                    {success.message}
                </Alert>
            )}

            {error && (
                <Alert variant="danger">
                    {error.message}
                </Alert>
            )}

            <Image src={details.images.show} alt="Poster" fluid={true} />
            <Stack direction="horizontal" gap={3}>
                <h1 className="header">{details.title}</h1>
                <Button variant="outline-dark" onClick={onClick}>Ajouter</Button>
            </Stack>
            <p className="font-weight-bold">{details.seasons} saisons • {details.network}</p>
            <Alert variant={details.status === "Ended" ? "success" : "warning"}>
                {details.status === "Ended" ? "Terminée" : "En cours"}
            </Alert>
            <TextCard title="Création" text={details.creation} />
            <TextCard title="Note" text={`${details.note.toFixed(2)} / 5`} />
            <TextCard title="Synopsis" text={details.description} />
        </Container>
    );
};