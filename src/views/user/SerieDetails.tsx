import { useEffect, useState } from "react";
import { Alert, Button, Container, Image, Stack } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Guard from "../../components/Guard";
import { ApiShowDetails } from "../../models/apiShow/ApiShowDetails";
import searchService from "../../services/searchService";
import showService from "../../services/showService";

export default function SeriesDetails() {
    const { id } = useParams<string>();
    const [show, setShow] = useState<ApiShowDetails | null>(null);
    const [error, setError] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const resp = await searchService.getShowById(id!);

            if (resp.status === 200) {
                const data: ApiShowDetails = await resp.json();
                setShow(data);
            }
        })();
    }, []);

    const onClick = async () => {
        if (window.confirm('Supprimer la série ?')) {
            const resp = await showService.deleteShow(id!);

            if (resp.status === 204) {
                navigate('/series', { replace: true });
            } else {
                setError(await resp.json());
            }
        }
    }

    return (
        <Container>
            <Guard />

            {error && (
                <Alert variant="danger" className="mt-2">
                    {error.message}
                </Alert>
            )}

            {show && <>
                <Image src={show.images.show} alt="Poster" fluid={true} />

                <Stack direction="horizontal" gap={3}>
                    <Link to={`/discover/series/${show.id}`} className="text-dark">
                        <h1 className="header">{show.title}</h1>
                    </Link>
                    <Button variant="outline-danger" onClick={onClick}>Supprimer</Button>
                </Stack>

                <p className="font-weight-bold">{show.seasons} saisons • {show.network}</p>

                <Alert variant={show.status === "Ended" ? "success" : "warning"}>
                    {show.status === "Ended" ? "Terminée" : "En cours"}
                </Alert>

                <Button variant="outline-dark" href={`/series/${show.id}/seasons`}>Ajouter une saison</Button>
            </>}
        </Container>
    );
};