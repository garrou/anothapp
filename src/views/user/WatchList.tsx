import { Container } from "react-bootstrap";
import Navigation from "../../components/Navigation";

export default function WatchList() {
    return (
        <Container className="mb-3">
            <Navigation url={'/watchlist'} />

        </Container>
    );
};