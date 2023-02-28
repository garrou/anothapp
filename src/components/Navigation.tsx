import { Container, Nav, Navbar } from "react-bootstrap";
import Guard from "./Guard";

interface Props {
    url: string
}

export default function Navigation({ url }: Props) {

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
                            <Nav.Link href="/discover/series">Découvrir</Nav.Link>
                            <Nav.Link href="/month">Ce mois</Nav.Link>
                            <Nav.Link href="/profile">Profil</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};