import { Container, Image, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import storageService from "../services/storageService";
import { useEffect } from "react";
import profileService from "../services/profileService";

interface Props {
    url: string
}

export default function Navigation({ url }: Props) {
    const navigate = useNavigate();

    useEffect(() => {
        checkIfLogged();
    });

    const checkIfLogged = async () => {
        const resp = await profileService.checkUser();

        if (resp.status !== 200)
            navigate("/login", { replace: true });
    }

    const onClick = () => {
        storageService.deleteJwt();
        navigate("/", { replace: true });
    }

    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand href="/series">A</Navbar.Brand>
                <Nav defaultActiveKey={url} className="me-auto">
                    <NavDropdown title="Séries" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/series">Mes séries</NavDropdown.Item>
                        <NavDropdown.Item href="/discover">Ajouter</NavDropdown.Item>
                        <NavDropdown.Item href="/not-started">À voir</NavDropdown.Item>
                        <NavDropdown.Item href="/continue">À suivre</NavDropdown.Item>
                        <NavDropdown.Item href="/month">Vues ces derniers mois</NavDropdown.Item>
                        {/* <NavDropdown.Item href="/resume">Reprendre</NavDropdown.Item> */}
                    </NavDropdown>
                    <NavDropdown title="Activités" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/next">Prochainement</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Profil" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/profile">Afficher</NavDropdown.Item>
                        <NavDropdown.Item onClick={onClick} className="text-danger">Se déconnecter</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};