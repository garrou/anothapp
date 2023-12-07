import { Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { errorToast } from "../../helpers/toasts";
import profileService from "../../services/profileService";
import { useEffect } from "react";

export default function Register() {
    const navigate = useNavigate();

    useEffect(() => {
        checkIfLogged();
    }, []);

    const checkIfLogged = async () => {
        const resp = await profileService.checkUser();

        if (resp.status === 200) navigate("/series", { replace: true });
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();

        const email: string = e.target.registerEmail.value;
        const password: string = e.target.registerPassword.value;
        const confirm: string = e.target.registerConfirm.value;
        const resp = await profileService.register(email, password, confirm);

        if (resp.status === 201)
            navigate("/login");
        else
            errorToast(await resp.json());
    }

    return (
        <Container>
            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>Créer un compte</Card.Title>
                    <Form className="my-3" onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="registerEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="registerPassword">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="Mot de passe" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="registerConfirm">
                            <Form.Label>Confirmer le mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="Mot de passe" required />
                        </Form.Group>
                        <Button variant="outline-dark" type="submit">Créer un compte</Button>
                    </Form>
                    <Link to={'/login'}>Se connecter</Link>
                </Card.Body>
            </Card>
        </Container>
    );
}