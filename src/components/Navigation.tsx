import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
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

            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="/series">Anothapp</Navbar.Brand>
                    <Nav defaultActiveKey={url} className="me-auto">
                        <NavDropdown title="Séries" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/series">Mes séries</NavDropdown.Item>
                            <NavDropdown.Item href="/add-series">Ajouter</NavDropdown.Item>
                            <NavDropdown.Item href="/not-started">À voir</NavDropdown.Item>
                            <NavDropdown.Item href="/continue">À suivre</NavDropdown.Item>
                            <NavDropdown.Item href="/month">Vues ces derniers mois</NavDropdown.Item>
                            {/* <NavDropdown.Item href="/resume">Reprendre</NavDropdown.Item> */}
                        </NavDropdown>
                        <NavDropdown title="Profil" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile">Afficher</NavDropdown.Item>
                            <NavDropdown.Item onClick={onClick} className="text-danger">Se déconnecter</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};