import { Button, Container } from "react-bootstrap";
import Navigation from "../../components/Navigation";

export default function Series() {
    return (
        <Container>
            <Navigation />
            { /* USER SERIES */ }
            <Button href="/search/shows" variant="outline-dark" className="mt-2">Ajouter une série</Button>
        </Container>
    );
};