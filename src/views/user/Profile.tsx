import { Button, Card, Col, Container, Form, ListGroup, Modal, Row } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import { useEffect, useState } from "react";
import { errorToast, successToast } from "../../helpers/toasts";
import { User } from "../../models/internal/User";
import userService from "../../services/userService";
import Loading from "../../components/Loading";
import { FriendProps } from "../../models/internal/FriendProps";

export default function Profile(props: FriendProps) {
    const [user, setUser] = useState<User>();
    const [showMailModal, setShowMailModal] = useState(false);
    const [showPassModal, setShowPassModal] = useState(false);

    useEffect(() => {
        getUserProfile();
    }, []);

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

            <EmailModal show={showMailModal} close={() => setShowMailModal(false)} />
            <PasswordModal show={showPassModal} close={() => setShowPassModal(false)} />

            {user ? <Row xs={1} md={2}>
                <Col className="mt-2">
                    <Card>
                        {user.picture && <Card.Img src={user.picture} variant="top" alt="Photo de profil" />}
                        <Card.Body>
                            <Card.Title>{user.email}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mt-2">
                    <Card>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item onClick={() => setShowMailModal(true)} style={{ cursor: "pointer" }}>
                                Modifier l'email
                            </ListGroup.Item>
                            <ListGroup.Item onClick={() => setShowPassModal(true)} style={{ cursor: "pointer" }}>
                                Modifier le mot de passe
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row> : <Loading />}
        </Container>
    );
};

interface Props {

    show: boolean;

    close: () => void;
}

function EmailModal({ show, close }: Props) {

    const onSubmit = async (e: any) => {
        e.preventDefault();
        
        const email: string = e.target.email.value;
        const newEmail: string = e.target.newEmail.value;
        const resp = await userService.changeEmail(email, newEmail);

        if (resp.status === 200) {
            successToast("Email modifié");
            close();
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <Modal show={show} dialogClassName="modal-90w" onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Changer le mail</Modal.Title>
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

function PasswordModal({ show, close }: Props) {

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
            close();
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <Modal show={show} dialogClassName="modal-90w" onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Changer le mail</Modal.Title>
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