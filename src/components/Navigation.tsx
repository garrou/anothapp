import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Guard from "./Guard";

interface Props {
    url: string
}

export default function Navigation({ url }: Props) {
    const navigate = useNavigate();

    const onClick = () => {
        localStorage.removeItem('jwt');
        navigate('/', { replace: true });
    }

    return (
        <>
            <Guard />

            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/series">Anothapp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav defaultActiveKey={url} className="me-auto">
                            <Nav.Link href="/series">Mes séries</Nav.Link>
                            <Nav.Link href="/add/series">Ajouter</Nav.Link>
                            <Nav.Link href="/month">Ces derniers mois</Nav.Link>
                            <Nav.Link href="/profile">Profil</Nav.Link>
                            <Button variant="outline-dark" className="btn-sm" onClick={onClick}>Se déconnecter</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};