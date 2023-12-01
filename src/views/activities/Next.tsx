import { Container } from "react-bootstrap";
import Navigation from "../../components/Navigation";

export default function Next() {
    return (
        <Container className="mb-3">
            <Navigation url={'/next'} />

            <p className="text-center mt-3r">WORK IN PROGRESS</p>
        </Container>
    )
}