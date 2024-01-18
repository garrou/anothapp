import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ApiShowDetails } from "../../models/external/ApiShowDetails";
import searchService from "../../services/searchService";
import { Button, Container, Stack, Tab, Tabs, Image, Card, Col, Row, Modal } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import Loading from "../../components/Loading";
import { errorToast } from "../../helpers/toasts";
import ApiShowInfos from "../../components/external/ApiShowInfos";
import showService from "../../services/showService";
import { getImageUrl } from "../../models/external/ApiShowImage";
import ApiSimilarShowTable from "../../components/external/ApiSimilarShowTable";
import TabEventKey from "../../models/internal/TabEventKey";
import { ApiCharacterPreview } from "../../models/external/ApiCharacterPreview";
import { TabProps } from "../../models/internal/TabProps";
import { ApiPerson } from "../../models/external/ApiPerson";
import TextCard from "../../components/external/TextCard";

export default function DiscoverDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { state } = useLocation();
    const [show, setShow] = useState<ApiShowDetails>();
    const [key, setKey] = useState(TabEventKey.ApiShowInfo);

    useEffect(() => {
        if (state) {
            const { serie } = state;
            if (serie) setShow(serie);
        } else {
            getShow();
        }
    }, []);

    const getShow = async () => {
        const resp = await searchService.getShowById(Number(id));

        if (resp.status === 200)
            setShow(await resp.json());
        else
            errorToast(await resp.json());
    }

    const onClick = async () => {
        if (!show) return errorToast({ message: "Impossible d'ajouter la série" });
        const resp = await showService.addShow(show);

        if (resp.status === 201)
            navigate(`/series/${show.id}`);
        else
            errorToast(await resp.json());
    };

    return (
        <Container>
            <Navigation />

            {show ? <>
                {getImageUrl(show.images) && <Image src={show.images.show ?? getImageUrl(show.images)!} alt="Poster" fluid={true} />}

                <Stack direction="horizontal" gap={3}>
                    <h1 className="header">{show.title}</h1>
                    <Button variant="outline-dark" onClick={onClick}>
                        <i className="bi-plus"></i>
                    </Button>
                </Stack>

                <Tabs
                    activeKey={key}
                    className="my-3"
                    onSelect={(k) => setKey(k! as TabEventKey)}
                >
                    <Tab eventKey={TabEventKey.ApiShowInfo} title="Infos">
                        <ApiShowInfos show={show} />
                    </Tab>
                    <Tab eventKey={TabEventKey.ApiCharacters} title="Acteurs">
                        <ApiCharactersRow showId={show.id} tabKey={key} />
                    </Tab>
                    <Tab eventKey={TabEventKey.ApiSimilars} title="Similaires">
                        <ApiSimilarShowTable showId={show.id} tabKey={key} />
                    </Tab>
                </Tabs>
            </> : <Loading />}
        </Container>
    );
};

function ApiCharactersRow({ showId, tabKey }: TabProps) {
    const [characters, setCharacters] = useState<ApiCharacterPreview[]>([]);
    const [person, setPerson] = useState<ApiPerson>();
    const [showModal, setShowModal] = useState(false);
    const [isLoad, setIsLoad] = useState(true);

    useEffect(() => {
        getCharacters();
    }, [tabKey]);

    const getCharacters = async () => {
        if (tabKey !== TabEventKey.ApiCharacters || characters.length > 0) return
        const resp = await searchService.getCharactersByShowId(showId);

        if (resp.status === 200) {
            setCharacters(await resp.json());
            setIsLoad(false);
        } else {
            errorToast(await resp.json());
        }
    }

    const callModal = async (id: number) => {
        await getCharactersShowsAndMovies(id);
        setShowModal(true);
    }

    const getCharactersShowsAndMovies = async (id: number) => {
        const resp = await searchService.getPersonById(id);

        if (resp.status === 200)
            setPerson(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <>
            <Modal show={showModal} dialogClassName="modal-90w" onHide={() => setShowModal(false)}>
                {person ? <ModalContent person={person} /> : <Loading />}
            </Modal>

            {isLoad ? <Loading /> : <Row xs={2} md={3} lg={4} className="mt-4">
                {characters.map(character => (
                    <Col key={character.id} >
                        <Card className="mt-2" onClick={() => callModal(character.id)} style={{ cursor: "pointer" }}>
                            <Card.Body>
                                {character.picture && <Card.Img variant="top" src={character.picture} />}
                                <Card.Title><u>{character.actor}</u></Card.Title>
                                <Card.Subtitle>{character.name}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>}
        </>
    );
}

interface Props {

    person: ApiPerson;
}

function ModalContent({ person }: Props) {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{person.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {person.nationality && <TextCard title="Nationalité" text={person.nationality} />}
                {person.birthday && <TextCard title="Naissance" text={person.birthday} />}
                {person.deathday && <TextCard title="Décès" text={person.deathday} />}
                {person.description && <TextCard text={person.description} />}

                {person.shows.length > 0 && <b className="text-center">Séries</b>}

                <Row xs={2} md={3} lg={4}>
                    {person.shows.map(show => (
                        <Col key={show.id}>
                            <Link to={`/discover/${show.id}`} style={{ textDecoration: "none", color: "black" }}>
                                <Card className="mt-3">
                                    <Card.Body>
                                        {show.poster && <Card.Img variant="top" src={show.poster} />}
                                        <Card.Title>{show.title} ({show.creation})</Card.Title>
                                        <Card.Subtitle>Rôle : {show.name}</Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>

                {person.movies.length > 0 && <b className="text-center mt-4">Films</b>}

                <Row xs={2} md={3} lg={4}>
                    {person.movies.map(movie => (
                        <Col key={movie.id}>
                            <Card className="mt-3">
                                <Card.Body>
                                    {movie.poster && <Card.Img variant="top" src={movie.poster} />}
                                    <Card.Title>{movie.title} ({movie.productionYear})</Card.Title>
                                    <Card.Subtitle>Rôle : {movie.name}</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Modal.Body>
        </>
    )
}   