import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Image, ProgressBar, Row, Stack, Tab, Tabs } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Navigation from "../../components/Navigation";
import ViewingTimeShowCard from "../../components/internal/ViewingTimeShowCard";
import { ApiShowDetails } from "../../models/external/ApiShowDetails";
import searchService from "../../services/searchService";
import showService from "../../services/showService";
import { errorToast, successToast } from "../../helpers/toasts";
import { getImageUrl } from "../../models/external/ApiShowImage";
import ModalConfirm from "../../components/internal/ModalConfirm";
import { SeasonPreview } from "../../models/internal/SeasonPreview";
import SeasonCard from "../../components/internal/SeasonCard";
import ApiSeasonCard from "../../components/external/ApiSeasonCard";
import ApiShowInfos from "../../components/external/ApiShowInfos";
import profileService from "../../services/profileService";
import ApiSimilarShowTable from "../../components/external/ApiSimilarShowTable";
import TabEventKey from "../../models/internal/TabEventKey";
import { TabProps } from "../../models/internal/TabProps";

export default function SeriesDetails() {
    const { id } = useParams<string>();
    const [show, setShow] = useState<ApiShowDetails | null>(null);
    const [seasons, setSeasons] = useState<SeasonPreview[]>([]);
    const [apiSeasons, setApiSeasons] = useState<SeasonPreview[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [displayDetails, setDisplayDetails] = useState(false);
    const [key, setKey] = useState(TabEventKey.Seasons);
    const navigate = useNavigate();

    useEffect(() => {
        getShow();
        getSeasons();
        getApiSeasons();
    }, [refresh]);

    const notify = () => setRefresh(refresh + 1);

    const getShow = async () => {

        if (refresh > 0) return

        const resp = await searchService.getShowById(id!);

        if (resp.status === 200)
            setShow(await resp.json());
        else
            errorToast(await resp.json());
    }

    const getSeasons = async () => {
        const resp = await showService.getSeasonsByShow(Number(id));

        if (resp.status === 200)
            setSeasons(await resp.json());
        else
            errorToast(await resp.json());
    }

    const getApiSeasons = async () => {

        if (refresh > 0) return

        const resp = await searchService.getSeasonsByShowId(Number(id));

        if (resp.status === 200)
            setApiSeasons(await resp.json());
        else
            errorToast(await resp.json());
    }

    const progressBar = () => {
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

        if (resp.status === 204)
            navigate("/series", { replace: true });
        else
            errorToast(await resp.json());
    }

    return (
        <Container className="mb-3">
            <Navigation />

            <ModalConfirm
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleConfirm={onDelete}
            />

            {show ? <>
                {getImageUrl(show.images) && <Image src={show.images.show ?? getImageUrl(show.images)!} alt="Poster" fluid={true} />}

                <Stack direction="horizontal" className="mt-1" gap={3}>
                    <Link to={`/discover/${show.id}`} className="text-dark">
                        <h1 className="header">{show.title}</h1>
                    </Link>
                    <Button variant="outline-danger" onClick={() => setShowModal(true)}>
                        <i className="bi-trash"></i>
                    </Button>
                </Stack>

                <Form.Switch
                    className="mb-2"
                    type="switch"
                    id="detail-switch"
                    label="Voir le détail"
                    checked={displayDetails}
                    onChange={(e) => setDisplayDetails(e.target.checked)}
                />

                {displayDetails && <ApiShowInfos show={show} />}

                <ViewingTimeShowCard showId={show.id} />

                {seasons && apiSeasons && <div className="mt-3">
                    {progressBar()}
                </div>}

                <Tabs
                    id="series-details-tab"
                    activeKey={key}
                    className="my-3"
                    onSelect={(k) => setKey(k! as TabEventKey)}
                >
                    <Tab eventKey={TabEventKey.Seasons} title="Saisons">
                        <Row xs={2} md={3} lg={4} className="mt-4">
                            {seasons && seasons.map(s => (
                                <Col key={s.number}>
                                    <SeasonCard preview={s} showId={Number(id)} />
                                </Col>
                            ))}
                        </Row>
                    </Tab>
                    <Tab eventKey={TabEventKey.ApiSeasons} title="Ajouter">
                        <Row xs={2} md={3} lg={4} className="mt-4">
                            {apiSeasons && apiSeasons.map(s => (
                                <Col key={s.number}>
                                    <ApiSeasonCard preview={s} show={show} notify={notify} />
                                </Col>
                            ))}
                        </Row>
                    </Tab>
                    <Tab eventKey={TabEventKey.ApiImages} title="Images">
                        <ApiImagesRow showId={show.id} tabKey={key} />
                    </Tab>
                    <Tab eventKey={TabEventKey.ApiSimilars} title="Similaires">
                        <ApiSimilarShowTable showId={show.id} tabKey={key} />
                    </Tab>
                </Tabs>
            </> : <Loading />}
        </Container>
    );
};

function ApiImagesRow({ showId, tabKey }: TabProps) {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        getImagesByShowId(showId);
    }, [tabKey]);

    const getImagesByShowId = async (id: number) => {

        if (tabKey !== TabEventKey.ApiImages || images.length > 0) return

        const resp = await searchService.getImagesByShowId(id);

        if (resp.status === 200)
            setImages(await resp.json());
        else
            errorToast(await resp.json());
    }

    const setProfilePicture = async (image: string) => {
        const resp = await profileService.setProfilePicture(image);

        if (resp.status === 200)
            successToast("Image de profil modifiée");
        else
            errorToast(await resp.json());
    }

    return (
        <>
            {images && <Row xs={2} md={3} lg={4} className="mt-4">
                {images.map(image => (
                    <Col key={image} >
                        <Card className="mt-2">
                            <Card.Img variant="top" src={image} />
                            <Card.Body>
                                <Button onClick={_ => setProfilePicture(image)} variant="outline-dark">Choisir comme image de profil</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>}
        </>
    );
}