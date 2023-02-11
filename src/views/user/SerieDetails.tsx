import { useEffect, useState } from "react";
import { Button, Container, Image, Stack, Tab, Tabs } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Navigation from "../../components/Navigation";
import RowSeasonsCards from "../../components/internal/SeasonsCardsRow";
import ViewingTimeShowCard from "../../components/internal/ViewingTimeShowCard";
import { ApiShowDetails } from "../../models/external/ApiShowDetails";
import searchService from "../../services/searchService";
import showService from "../../services/showService";
import ApiSeasonsShowRow from "../../components/external/ApiSeasonsShowRow";
import AlertError from "../../components/AlertError";
import { ErrorMessage } from "../../models/internal/ErrorMessage";

export default function SeriesDetails() {
    const { id } = useParams<string>();
    const [show, setShow] = useState<ApiShowDetails | null>(null);
    const [error, setError] = useState<ErrorMessage|null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getShow();
    }, []);

    const getShow = async () => {
        const resp = await searchService.getShowById(id!);

        if (resp.status === 200) {
            const data: ApiShowDetails = await resp.json();
            setShow(data);
        } else {
            setError(await resp.json());
        }
    }

    const onClick = async () => {
        if (window.confirm('Supprimer la série ?')) {
            const resp = await showService.deleteShow(Number(id));

            if (resp.status === 204) {
                navigate('/series', { replace: true });
            } else {
                setError(await resp.json());
            }
        }
    }

    return (
        <Container className="mb-3">
            <Navigation url={'/series'} />

            {!show && !error && <Loading />}

            {error && <AlertError message={error.message} />}

            {show && <>
                <Image src={show.images.show} alt="Poster" fluid={true} />

                <Stack direction="horizontal" gap={3}>
                    <Link to={`/discover/series/${show.id}`} className="text-dark">
                        <h1 className="header">{show.title}</h1>
                    </Link>
                    <Button variant="outline-danger" onClick={onClick}>Supprimer</Button>
                </Stack>

                <p className="font-weight-bold">{show.seasons} saisons • {show.network}</p>

                <ViewingTimeShowCard showId={show.id} />

                <hr />

                <Tabs
                    defaultActiveKey="seasons"
                    className="my-3"
                >
                    <Tab eventKey="seasons" title="Mes saisons">
                        <RowSeasonsCards showId={show.id} />
                    </Tab>
                    <Tab eventKey="add" title="Ajouter une saison">
                        <ApiSeasonsShowRow show={show} />
                    </Tab>
                </Tabs>
            </>}
        </Container>
    );
};