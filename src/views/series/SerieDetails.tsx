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
import favoriteService from "../../services/favoriteService";

export default function SeriesDetails() {
    const { id } = useParams<string>();
    const [show, setShow] = useState<ApiShowDetails | null>(null);
    const [seasons, setSeasons] = useState<SeasonPreview[]>([]);
    const [apiSeasons, setApiSeasons] = useState<SeasonPreview[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [displayDetails, setDisplayDetails] = useState(false);
    const [key, setKey] = useState(TabEventKey.Seasons);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getShow();
        getSeasons();
        getApiSeasons();
        getFavorite();
    }, [loaded]);

    const notify = () => setLoaded(true);

    const getShow = async () => {
        if (loaded) return
        const resp = await searchService.getShowById(Number(id));

        if (resp.status === 200)
            setShow(await resp.json());
        else
            errorToast(await resp.json());
    }

    const getFavorite = async () => {
        const resp = await favoriteService.getFavorite(Number(id));

        if (resp.status === 200) 
            setIsFavorite(await resp.json());
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
        if (loaded) return
        const resp = await searchService.getSeasonsByShowId(Number(id));

        if (resp.status === 200)
            setApiSeasons(await resp.json());
        else
            errorToast(await resp.json());
    }

    const onDelete = async () => {
        const resp = await showService.deleteShow(Number(id));

        if (resp.status === 204)
            navigate("/series", { replace: true });
        else
            errorToast(await resp.json());
    }

    const onAddFavorite = async () => {
        const resp = await favoriteService.addFavorite(Number(id));

        if (resp.status === 201) {
            successToast("Mise dans les favorites");
            setIsFavorite(true);
        } else {
            errorToast(await resp.json());
        }
    }

    const onDeleteFavorite = async () => {
        const resp = await favoriteService.deleteFavorite(Number(id));

        if (resp.status === 204) {
            successToast("Supprimée des favorites");
            setIsFavorite(false);
        } else {
            errorToast(await resp.json());
        }
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
                    {isFavorite ?
                        <Button variant="warning" onClick={onDeleteFavorite}>
                            <i className="bi bi-star"></i>
                        </Button> :
                        <Button variant="outline-warning" onClick={onAddFavorite}>
                            <i className="bi bi-star"></i>
                        </Button>}
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

                <ViewingTimeShowCard showId={show.id} loaded={loaded} />

                {seasons && apiSeasons && <WrapProgressBar nbSeason={seasons.length} nbApiSeason={apiSeasons.length} />}

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
                                    <SeasonCard preview={s} showId={s.showId} />
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

interface Props {

    nbSeason: number;

    nbApiSeason: number;
}

function WrapProgressBar({ nbSeason, nbApiSeason }: Props) {
    const progress = Math.ceil(nbSeason / nbApiSeason * 100);
    
    return (
        <Card>
            <Card.Body>
                <Card.Title>Avancement ({nbSeason} / {nbApiSeason})</Card.Title>
                <ProgressBar animated variant="success" now={progress} label={`${progress}%`} />
            </Card.Body>
        </Card>
    )
}

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
            {images.length === 0 && <p className="text-center">Aucune image</p>}

            <Row xs={2} md={3} lg={4} className="mt-4">
                {images.map(image => (
                    <Col key={image} >
                        <Card className="mt-2">
                            <Card.Img variant="top" src={image} />
                            <Card.Body>
                                <Button onClick={() => setProfilePicture(image)} variant="outline-dark">Choisir comme image de profil</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}