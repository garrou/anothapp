import { useEffect, useState } from "react";
import { Button, Card, Container, Image, ProgressBar, Stack, Tab, Tabs } from "react-bootstrap";
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
import ApiImagesRow from "../../components/external/ApiImagesRow";
import { getImageUrl } from "../../models/external/ApiShowImage";
import ApiSimilarShowTable from "../../components/external/ApiSimilarShowTable";
import ModalConfirm from "../../components/internal/ModalConfirm";
import { SeasonPreview } from "../../models/internal/SeasonPreview";

export default function SeriesDetails() {
    const { id } = useParams<string>();
    const [show, setShow] = useState<ApiShowDetails | null>(null);
    const [seasons, setSeasons] = useState<SeasonPreview[]>([]);
    const [apiSeasons, setApiSeasons] = useState<SeasonPreview[]>([]);
    const [error, setError] = useState<ErrorMessage | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        getShow();
        getSeasons();
        getApiSeasons();
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

    const getSeasons = async () => {
        const resp = await showService.getSeasonsByShow(Number(id));

        if (resp.status === 200) {
            const data: SeasonPreview[] = await resp.json();
            setSeasons(data);
        } else {
            setError(await resp.json());
        }
    }

    const getApiSeasons = async () => {
        const resp = await searchService.getSeasonsByShowId(Number(id));

        if (resp.status === 200) {
            const data: SeasonPreview[] = await resp.json();
            setApiSeasons(data);
        } else {
            setError(await resp.json());
        }
    }

    const buildProgressBar = () => {
        const progress = Math.ceil(seasons.length / apiSeasons.length * 100);
        return (
            <Card>
                <Card.Body>
                    <Card.Title>Avancement</Card.Title>
                    <ProgressBar animated variant="success" now={progress} label={`${progress}%`} />
                </Card.Body>
            </Card>
        )
    }

    const onDelete = async () => {
        const resp = await showService.deleteShow(Number(id));

        if (resp.status === 204) {
            navigate('/series', { replace: true });
        } else {
            setError(await resp.json());
        }
    }

    return (
        <Container className="mb-3">
            <Navigation url={'/series'} />

            <ModalConfirm
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleConfirm={onDelete}
            />

            {!show && !error && <Loading />}

            {error && <AlertError message={error.message} />}

            {show && <>
                {getImageUrl(show.images) && <Image src={show.images.show ?? getImageUrl(show.images)!} alt="Poster" fluid={true} />}

                <Stack direction="horizontal" gap={3}>
                    <Link to={`/add-series/${show.id}`} className="text-dark">
                        <h1 className="header">{show.title}</h1>
                    </Link>
                    <Button variant="outline-danger" onClick={() => setShowModal(true)}>Supprimer</Button>
                </Stack>

                <p className="font-weight-bold">{show.seasons} saisons • {show.network}</p>

                <ViewingTimeShowCard showId={show.id} />

                <div className="mt-3">
                    {seasons && apiSeasons && buildProgressBar()}
                </div>

                <Tabs
                    defaultActiveKey="seasons"
                    className="my-3"
                >
                    <Tab eventKey="seasons" title="Saisons">
                        <RowSeasonsCards showId={Number(id)} seasons={seasons} />
                    </Tab>
                    <Tab eventKey="add" title="Ajouter">
                        <ApiSeasonsShowRow show={show} seasons={apiSeasons} />
                    </Tab>
                    <Tab eventKey="images" title="Images">
                        <ApiImagesRow showId={show.id} />
                    </Tab>
                    <Tab eventKey="similar" title="Similaires">
                        <ApiSimilarShowTable showId={show.id} />
                    </Tab>
                </Tabs>
            </>}
        </Container>
    );
};