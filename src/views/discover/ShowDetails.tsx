import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiShowDetails } from "../../models/external/ApiShowDetails";
import searchService from "../../services/searchService";
import showService from "../../services/showService";
import { Alert, Button, Container, Image, Stack } from "react-bootstrap";
import TextCard from "../../components/external/TextCard";
import Navigation from "../../components/Navigation";
import Loading from "../../components/Loading";

export default function ShowDetails() {
    const { id } = useParams<string>();
    const [show, setShow] = useState<ApiShowDetails | null>(null);
    const [error, setError] = useState<any>(undefined);
    const navigate = useNavigate();

    const onClick = async () => {
        const resp = await showService.addShow(show!);

        if (resp.status === 201) {
            navigate(`/series/${show!.id}`);
        } else {
            setError(await resp.json());
        }
    };

    const getShow = async () => {
        const resp = await searchService.getShowById(id!);

        if (resp.status === 200) {
            const data: ApiShowDetails = await resp.json();
            setShow(data);
        }
    }

    useEffect(() => {
        getShow();
    }, []);

    return (
        <Container>
            <Navigation url={'/discover/series'} />

            {error && (
                <Alert variant="danger">
                    {error.message}
                </Alert>
            )}

            {!show && <Loading />}

            {show && <>
                <Image src={show.images.show} alt="Poster" fluid={true} />

                <Stack direction="horizontal" gap={3}>
                    <h1 className="header">{show.title}</h1>
                    <Button variant="outline-dark" onClick={onClick}>Ajouter</Button>
                </Stack>

                <p className="font-weight-bold">{show.seasons} saisons • {show.network}</p>

                <Alert variant={show.status === "Ended" ? "success" : "warning"}>
                    {show.status === "Ended" ? "Terminée" : "En cours"}
                </Alert>

                <TextCard title="Création" text={show.creation} />
                <TextCard title="Note" text={`${show.note.toFixed(2)} / 5`} />
                <TextCard title="Synopsis" text={show.description} />
            </>}
        </Container>
    );
};