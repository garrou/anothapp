import { Accordion, Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import { useEffect, useState } from "react";
import { errorToast, successToast } from "../../helpers/toasts";
import { User } from "../../models/internal/User";
import userService from "../../services/userService";
import Loading from "../../components/Loading";
import { FriendProps } from "../../models/internal/FriendProps";
import showService from "../../services/showService";
import { ShowPreview } from "../../models/internal/ShowPreview";
import searchService from "../../services/searchService";

export default function Profile(props: FriendProps) {
    const [user, setUser] = useState<User>();
    const [showImageModal, setShowImageModal] = useState(false);
    const [showMailModal, setShowMailModal] = useState(false);
    const [showPassModal, setShowPassModal] = useState(false);

    useEffect(() => {
        if (!showImageModal) 
            getUserProfile();
    }, [showImageModal]);

    const getUserProfile = async () => {
        const resp = await userService.getProfile(props.userId);

        if (resp.status === 200)
            setUser(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <Container className="mb-3 text-center">
            {!props.userId && <Navigation />}

            <ImageModal close={() => setShowImageModal(false)} show={showImageModal} title={"Modifier l'image"} />
            <EmailModal close={() => setShowMailModal(false)} show={showMailModal} title={"Modifier l'email"} />
            <PasswordModal close={() => setShowPassModal(false)} show={showPassModal} title={"Modifier le mot de passe"} />

            {user ? <Row xs={1} md={2}>
                <Col className="mt-2">
                    <Card>
                        {user.picture && <Card.Img src={user.picture} variant="top" alt="Photo de profil" />}
                        <Card.Body>
                            <Button variant="outline-dark" onClick={() => setShowImageModal(true)}>
                                <i className="bi-image"></i>
                                &nbsp;Image
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mt-2">
                    <Card>
                        <Card.Body>
                            <Card.Title>{user.email}</Card.Title>
                            <div className="d-flex justify-content-around">
                                <Button variant="outline-dark" onClick={() => setShowMailModal(true)}>
                                    <i className="bi-envelope"></i>
                                    &nbsp;Email
                                </Button>
                                <Button variant="outline-dark" onClick={() => setShowPassModal(true)}>
                                    <i className="bi-lock"></i>
                                    &nbsp;Mot de passe
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row> : <Loading />}
        </Container>
    );
};

interface Props {

    close: () => void;

    show: boolean;

    title: string;
}


function ImageModal(props: Props) {
    const [shows, setShows] = useState<ShowPreview[]>([]);
    const [tempShows, setTempShows] = useState<ShowPreview[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [isLoad, setIsLoad] = useState(true);
    const [isLoadImg, setIsLoadImg] = useState(true);

    useEffect(() => {
        getShows();
    }, []);

    const getShows = async () => {
        const resp = await showService.getShows();

        if (resp.status === 200) {
            const data = await resp.json();
            setShows(data);
            setTempShows(data);
            setIsLoad(false);
        } else {
            errorToast(await resp.json());
        }
    }

    const onSearch = (e: any) => {
        e.preventDefault();
        const title = e.target.titleSearch.value;

        if (title.length > 0) {
            setTempShows(shows);
            setShows(shows.filter((s) => s.title.toLowerCase().includes(title.toLowerCase())));
        } else {
            setShows(tempShows);
        }
    }

    const loadImages = async (showId: string) => {
        setImages([]);
        setIsLoadImg(true);

        const resp = await searchService.getImagesByShowId(parseInt(showId));

        if (resp.status === 200) {
            setImages(await resp.json());
            setIsLoadImg(false);
        } else {
            errorToast(await resp.json());
        }
    }

    const setProfilePicture = async (image: string) => {
        const resp = await userService.setProfilePicture(image);

        if (resp.status === 200)
            successToast("Image de profil modifiée");
        else
            errorToast(await resp.json());
    }

    return (
        <Modal show={props.show} dialogClassName="modal-90w" onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="my-3" onSubmit={onSearch}>
                    <Row>
                        <Col>
                            <Form.Group controlId="titleSearch">
                                <Form.Control type="text" placeholder="Titre de la série" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Button variant="outline-dark" type="submit">
                                <i className="bi-search"></i>
                            </Button>
                        </Col>
                    </Row>
                </Form>

                {isLoad ?
                    <Loading /> :
                    <Accordion onSelect={(eventKey) => eventKey && loadImages(`${eventKey}`)}>
                        {shows.length > 0 && shows.map(s => (
                            <Accordion.Item key={s.id} eventKey={`${s.id}`}>
                                <Accordion.Header>{s.title}</Accordion.Header>
                                <Accordion.Body>
                                    {isLoadImg ?
                                        <Loading /> :
                                        <Row xs={2} md={3} lg={4} className="mt-4">
                                            {images.map(image => (
                                                <Col key={image} >
                                                    <Card className="mt-2">
                                                        <Card.Img variant="top" src={image} />
                                                        <Card.Body>
                                                            <Button onClick={() => setProfilePicture(image)}
                                                                variant="outline-dark">Choisir comme image de profil
                                                            </Button>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>}
                                </Accordion.Body>
                            </Accordion.Item>))}
                    </Accordion>}
            </Modal.Body>
        </Modal>
    )
}

function EmailModal(props: Props) {

    const onSubmit = async (e: any) => {
        e.preventDefault();

        const email: string = e.target.email.value;
        const newEmail: string = e.target.newEmail.value;
        const resp = await userService.changeEmail(email, newEmail);

        if (resp.status === 200) {
            successToast("Email modifié");
            props.close();
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <Modal show={props.show} dialogClassName="modal-90w" onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="my-3" onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email actuel</Form.Label>
                        <Form.Control type="email" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="newEmail">
                        <Form.Label>Nouveau mail</Form.Label>
                        <Form.Control type="email" required />
                    </Form.Group>
                    <Button variant="outline-dark" type="submit">Enregistrer</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

function PasswordModal(props: Props) {

    const onSubmit = async (e: any) => {
        e.preventDefault();

        const currentPassword: string = e.target.currentPass.value;
        const newPassword: string = e.target.newPass.value;
        const confirmPassword: string = e.target.confirmPass.value;

        if (newPassword !== confirmPassword) {
            return errorToast({ message: "Mot de passe différents" });
        }
        if (currentPassword === newPassword) {
            return errorToast({ message: "Le nouveau mot de passe doit être différent de l'ancien" });
        }
        const resp = await userService.changePassword(currentPassword, newPassword, confirmPassword);

        if (resp.status === 200) {
            successToast("Mot de passe modifié");
            props.close();
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <Modal show={props.show} dialogClassName="modal-90w" onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="my-3" onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="currentPass">
                        <Form.Label>Mot de passe actuel</Form.Label>
                        <Form.Control type="password" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="newPass">
                        <Form.Label>Nouveau mot de passe</Form.Label>
                        <Form.Control type="password" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirmPass">
                        <Form.Label>Confirmer le mot de passe</Form.Label>
                        <Form.Control type="password" required />
                    </Form.Group>
                    <Button variant="outline-dark" type="submit">Enregistrer</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}