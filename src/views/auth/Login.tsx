import { Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { errorToast } from "../../helpers/toasts";
import Redirect from "../../components/Redirect";
import profileService from "../../services/profileService";
import storageService from "../../services/storageService";

export default function Login() {
    const navigate = useNavigate();

    const onSubmit = async (e: any) => {
        e.preventDefault();
        
        const email: string = e.target.loginEmail.value;
        const password: string = e.target.loginPassword.value;
        const resp = await profileService.login(email, password);

        if (resp.status === 200) {
            storageService.storeJwt((await resp.json()).token);
            navigate('/series', { replace: true });
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <Container>
            <Redirect />

            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>Se connecter</Card.Title>
                    <Form className="my-3" onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="loginEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="loginPassword">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="Mot de passe" required />
                        </Form.Group>
                        <Button variant="outline-dark" type="submit">Se connecter</Button>
                    </Form>
                    <Link to={'/register'}>Créer un compte</Link>
                </Card.Body>
            </Card>
        </Container>
    );
}