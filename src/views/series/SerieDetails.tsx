import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Image, ProgressBar, Row, Stack, Tab, Tabs } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Navigation from "../../components/Navigation";
import ViewingTimeShowCard from "../../components/internal/ViewingTimeShowCard";
import { ApiShowDetails } from "../../models/external/ApiShow";
import searchService from "../../services/searchService";
import showService from "../../services/showService";
import { errorToast, successToast } from "../../helpers/toasts";
import { getImageUrl } from "../../models/external/ApiShow";
import ModalConfirm from "../../components/internal/ModalConfirm";
import { SeasonPreview } from "../../models/internal/Season";
import SeasonCard from "../../components/internal/SeasonCard";
import ApiSeasonCard from "../../components/external/ApiSeasonCard";
import ApiShowInfos from "../../components/external/ApiShowInfos";
import ApiSimilarShowTable from "../../components/external/ApiSimilarShowTable";
import favoriteService from "../../services/favoriteService";
import userService from "../../services/userService";
import { TabEventKey } from "../../models/internal/TabEventKey";

export default function SeriesDetails() {
    const { id } = useParams<string>();
    const [show, setShow] = useState<ApiShowDetails>();
    const [seasons, setSeasons] = useState<SeasonPreview[]>([]);
    const [apiSeasons, setApiSeasons] = useState<SeasonPreview[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [reload, setReload] = useState(0);
    const [key, setKey] = useState(TabEventKey.Seasons);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getShow();
        getApiSeasons();
        checkIfFavorite();
    }, []);

    useEffect(() => {
        getSeasons();
    }, [reload]);

    const notify = () => setReload(reload+1);

    const getShow = async () => {
        const resp = await searchService.getShowById(Number(id));

        if (resp.status === 200)
            setShow(await resp.json());
        else
            errorToast(await resp.json());
    }

    const checkIfFavorite = async () => {
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
            successToast(`${show?.title} ajoutée dans les favorites`);
            setIsFavorite(true);
        } else {
            errorToast(await resp.json());
        }
    }

    const onDeleteFavorite = async () => {
        const resp = await favoriteService.deleteFavorite(Number(id));

        if (resp.status === 204) {
            successToast(`${show?.title} supprimée des favorites`);
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
                title = "Supprimer la série"
                body = "Voulez supprimer cette série ?"        
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

                <ViewingTimeShowCard showId={show.id} reload={reload} />

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
                        <ApiImagesRow showId={show.id} />
                    </Tab>
                    <Tab eventKey={TabEventKey.ApiSimilars} title="Similaires">
                        <ApiSimilarShowTable showId={show.id} />
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
                <ProgressBar animated variant="success" now={progress} label={`${progress}%`} visuallyHidden />
            </Card.Body>
        </Card>
    )
}

function ApiImagesRow({ showId }: { showId: number }) {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        getImagesByShowId(showId);
    }, []);

    const getImagesByShowId = async (id: number) => {
        const resp = await searchService.getImagesByShowId(id);

        if (resp.status === 200)
            setImages(await resp.json());
        else
            errorToast(await resp.json());
    }

    const setProfilePicture = async (image: string) => {
        const resp = await userService.setProfilePicture(image);

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