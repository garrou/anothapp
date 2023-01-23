import { Container, Nav, Navbar } from "react-bootstrap";
import Guard from "./Guard";

export default function Navigation() {
    return (
        <>
            <Guard />

            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/series">Anothapp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/series">Séries</Nav.Link>
                            <Nav.Link href="/watchlist">En cours</Nav.Link>
                            <Nav.Link href="/profile">Profil</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};