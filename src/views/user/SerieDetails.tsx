import { useEffect, useState } from "react";
import { Alert, Button, Container, Image, Stack, Tab, Tabs } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Navigation from "../../components/Navigation";
import RowSeasonsCards from "../../components/user/SeasonsCardsRow";
import ViewingTimeShowCard from "../../components/user/ViewingTimeShowCard";
import { ApiShowDetails } from "../../models/apiShow/ApiShowDetails";
import searchService from "../../services/searchService";
import showService from "../../services/showService";
import ApiSeasonsShow from "../../components/api/ApiSeasonsShow";

export default function SeriesDetails() {
    const { id } = useParams<string>();
    const [show, setShow] = useState<ApiShowDetails | null>(null);
    const [error, setError] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getShow();
    }, []);

    const getShow = async () => {
        const resp = await searchService.getShowById(id!);

        if (resp.status === 200) {
            const data: ApiShowDetails = await resp.json();
            setShow(data);
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

                <ViewingTimeShowCard showId={show.id} />

                <hr />

                <Tabs
                    defaultActiveKey="seasons"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="seasons" title="Mes saisons">
                        <RowSeasonsCards showId={show.id} />
                    </Tab>
                    <Tab eventKey="add" title="Ajouter une saison">
                        <ApiSeasonsShow show={show} />
                    </Tab>
                    <Tab eventKey="characters" title="Acteurs">

                    </Tab>
                </Tabs>
            </>}
        </Container>
    );
};