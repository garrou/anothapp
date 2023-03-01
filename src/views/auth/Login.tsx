import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AlertError from "../../components/AlertError";
import Redirect from "../../components/Redirect";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import profileService from "../../services/profileService";

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<ErrorMessage | null>(null);
    const navigate = useNavigate();

    const onSubmit = async (e: any) => {
        e.preventDefault();

        const resp = await profileService.login(email, password);

        if (resp.status === 200) {
            const data = await resp.json();
            localStorage.setItem('jwt', data.token);
            navigate('/series', { replace: true });
        } else {
            setError(await resp.json());
        }
    }

    return (
        <Container>
            <Redirect />

            {error && <AlertError message={error.message} />}

            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>Se connecter</Card.Title>
                    <Form className="my-3" onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="login">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" onChange={(e => setEmail(e.target.value))} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="login">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="Mot de passe" onChange={(e => setPassword(e.target.value))} required />
                        </Form.Group>
                        <Button variant="outline-dark" type="submit">Se connecter</Button>
                    </Form>
                    <Link to={'/register'}>Créer un compte</Link>
                </Card.Body>
            </Card>
        </Container>
    );
}