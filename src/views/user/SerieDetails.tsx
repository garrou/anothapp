import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, ProgressBar, Row, Stack, Tab, Tabs } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Navigation from "../../components/Navigation";
import ViewingTimeShowCard from "../../components/internal/ViewingTimeShowCard";
import { ApiShowDetails } from "../../models/external/ApiShowDetails";
import searchService from "../../services/searchService";
import showService from "../../services/showService";
import { errorToast } from "../../helpers/toasts";
import ApiImagesRow from "../../components/external/ApiImagesRow";
import { getImageUrl } from "../../models/external/ApiShowImage";
import ModalConfirm from "../../components/internal/ModalConfirm";
import { SeasonPreview } from "../../models/internal/SeasonPreview";
import SeasonCard from "../../components/internal/SeasonCard";
import ApiSeasonCard from "../../components/external/ApiSeasonCard";
import ApiSimilarShowTable from "../../components/external/ApiSimilarShowTable";

export default function SeriesDetails() {
    const { id } = useParams<string>();
    const [show, setShow] = useState<ApiShowDetails | null>(null);
    const [seasons, setSeasons] = useState<SeasonPreview[]>([]);
    const [apiSeasons, setApiSeasons] = useState<SeasonPreview[]>([]);
    
    const [showModal, setShowModal] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        getShow();
        getSeasons();
        getApiSeasons();
    }, [refresh]);

    const notify = () => setRefresh(refresh+1);

    const getShow = async () => {

        if (refresh > 0) return 

        const resp = await searchService.getShowById(id!);

        if (resp.status === 200) {
            const data: ApiShowDetails = await resp.json();
            setShow(data);
        } else {
            errorToast(await resp.json());
        }
    }

    const getSeasons = async () => {
        const resp = await showService.getSeasonsByShow(Number(id));

        if (resp.status === 200) {
            const data: SeasonPreview[] = await resp.json();
            setSeasons(data);
        } else {
            errorToast(await resp.json());
        }
    }

    const getApiSeasons = async () => {

        if (refresh > 0) return 

        const resp = await searchService.getSeasonsByShowId(Number(id));

        if (resp.status === 200) {
            const data: SeasonPreview[] = await resp.json();
            setApiSeasons(data);
        } else {
            errorToast(await resp.json());
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
            errorToast(await resp.json());
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

            {!show && <Loading />}

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

                {seasons && apiSeasons && <div className="mt-3">
                    {buildProgressBar()}
                </div>}

                <Tabs
                    defaultActiveKey="seasons"
                    className="my-3"
                >
                    <Tab eventKey="seasons" title="Saisons">
                        <Row xs={2} md={3} lg={4} className="mt-4">
                            {seasons && seasons.map(s => (
                                <Col key={s.number}>
                                    <SeasonCard preview={s} showId={Number(id)} />
                                </Col>
                            ))}
                        </Row>
                    </Tab>
                    <Tab eventKey="add" title="Ajouter">
                        <Row xs={2} md={3} lg={4} className="mt-4">
                            {apiSeasons && apiSeasons.map(s => (
                                <Col key={s.number}>
                                    <ApiSeasonCard preview={s} show={show} notify={notify} />
                                </Col>
                            ))}
                        </Row>
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