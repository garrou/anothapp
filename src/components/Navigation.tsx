import { useEffect, useState } from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Guard from "./Guard";

interface Props {
    url: string
}

export default function Navigation({ url }: Props) {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const resp = await fetch(`${process.env.REACT_APP_SERVER}/auth/me`, {
            credentials: 'include'
        });

        if (resp.status === 200) {
            setUser(await resp.json());
        } else {
            navigate('/', { replace: true });
        }
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/series">Anothapp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav defaultActiveKey={url} className="me-auto">
                        <Nav.Link href="/series">Mes séries</Nav.Link>
                        <Nav.Link href="/discover/series">Découvrir</Nav.Link>
                        <Nav.Link href="/watchlist">En cours</Nav.Link>
                        <Nav.Link href="/profile">Profil</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        {user && <Image src={user.picture} alt="User image"  roundedCircle={true} />}
                    </Navbar.Collapse>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};