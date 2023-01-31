import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Image, Row, Stack } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Navigation from "../../components/Navigation";
import SeasonCard from "../../components/userShow/SeasonCard";
import { ApiShowDetails } from "../../models/apiShow/ApiShowDetails";
import { SeasonPreview } from "../../models/userShow/SeasonPreview";
import searchService from "../../services/searchService";
import showService from "../../services/showService";

export default function SeriesDetails() {
    const { id } = useParams<string>();
    const [show, setShow] = useState<ApiShowDetails | null>(null);
    const [seasons, setSeasons] = useState<SeasonPreview[]>([]);
    const [error, setError] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getShow();
        getSeasons();
    }, []);

    const getShow = async () => {
        const resp = await searchService.getShowById(id!);

        if (resp.status === 200) {
            const data: ApiShowDetails = await resp.json();
            setShow(data);
        }
    }

    const getSeasons = async () => {
        const resp = await showService.getSeasonsByShow(id!);

        if (resp.status === 200) {
            const data: Array<SeasonPreview> = await resp.json();
            setSeasons(data);
        }
    }

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
            <Navigation />

            {error && (
                <Alert variant="danger" className="mt-2">
                    {error.message}
                </Alert>
            )}

            {!show && <Loading />}

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

                <hr />

                <Button variant="outline-dark" href={`/series/${show.id}/seasons`}>Ajouter une saison</Button>

                <Row xs={2} md={4} className="mt-4">
                    {seasons.map(s => (
                        <Col key={s.number}>
                            <SeasonCard key={s.number} preview={s} showId={show.id} />
                        </Col>
                    ))}
                </Row>
            </>}
        </Container>
    );
};