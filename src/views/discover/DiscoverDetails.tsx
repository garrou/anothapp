import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
        if (!id) return navigate(`/discover`);
        const resp = await searchService.getShowById(id);

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
    const [person, setPerson] = useState<ApiPerson | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [personId, setPersonId] = useState(0);

    useEffect(() => {
        getCharacters();
    }, [tabKey, showModal]);

    const getCharacters = async () => {
        if (tabKey !== TabEventKey.ApiCharacters || characters.length > 0) return
        const resp = await searchService.getCharactersByShowId(showId);

        if (resp.status === 200)
            setCharacters(await resp.json());
        else
            errorToast(await resp.json());
    }

    const callModal = (id: number) => {
        setPersonId(id);
        setShowModal(true);
    }

    const getCharactersShowsAndMovies = async () => {
        if (!showModal) return
        const resp = await searchService.getPersonById(personId);

        if (resp.status === 200)
            setPerson(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <>
            <Modal show={showModal} fullscreen={true} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>Modal body content</Modal.Body>
            </Modal>

            {characters.length > 0 ? <Row xs={2} md={3} lg={4} className="mt-4">
                {characters.map(character => (
                    <Col key={character.id} >
                        <Card className="mt-2" onClick={() => callModal(character.id)}>
                            <Card.Body>
                                {character.picture && <Card.Img variant="top" src={character.picture} />}
                                <Card.Title>{character.actor}</Card.Title>
                                <Card.Subtitle>{character.name}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row> : <Loading />}
        </>
    );
}