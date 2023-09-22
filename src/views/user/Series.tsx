import { Container, Tab, Tabs } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import ShowsRow from "../../components/internal/ShowsRow";

export default function Series() {
    
    return (
        <Container className="mb-3">
            <Navigation url={'/series'} />
            <ShowsRow />
        </Container>
    );
};