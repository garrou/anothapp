import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import storageService from "../services/storageService";
import { useEffect } from "react";
import profileService from "../services/profileService";

export default function Navigation() {
    const navigate = useNavigate();
    const url = window.location.pathname;

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
                <Nav className="me-auto">
                    <NavDropdown title="Séries" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/series" active={url === "/series"}>Mes séries</NavDropdown.Item>
                        <NavDropdown.Item href="/discover" active={url === "/discover"}>Ajouter</NavDropdown.Item>
                        <NavDropdown.Item href="/not-started" active={url === "/not-started"}>À voir</NavDropdown.Item>
                        <NavDropdown.Item href="/continue" active={url === "/continue"}>À suivre</NavDropdown.Item>
                        <NavDropdown.Item href="/last-months" active={url === "/last-months"}>Vues ces derniers mois</NavDropdown.Item>
                        {/* <NavDropdown.Item href="/resume">Reprendre</NavDropdown.Item> */}
                    </NavDropdown>
                    <NavDropdown title="Activités" id="activities-dropdown">
                        <NavDropdown.Item href="/next" active={url === "/next"}>Prochainement</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Profil" id="profile-dropdown">
                        <NavDropdown.Item href="/stats" active={url === "/stats"}>Statistiques</NavDropdown.Item>
                        <NavDropdown.Item href="/profile" active={url === "/profile"}>Profil</NavDropdown.Item>
                        <NavDropdown.Item onClick={onClick} className="text-danger">Se déconnecter</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};