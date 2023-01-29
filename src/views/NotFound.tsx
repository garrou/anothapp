import { Container } from "react-bootstrap";
import Guard from "../components/Guard";

export default function NotFound() {
    return (
        <Container>
            <Guard />

            <h1>NOT FOUND</h1>
        </Container>
    );
}