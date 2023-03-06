import { Container, Tab, Tabs } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import NotStartedShowsRow from "../../components/internal/NotStartedShowsRow";
import ShowsRow from "../../components/internal/ShowsRow";
import ShowsToContinue from "../../components/internal/ShowsToContinue";

export default function Series() {
    
    return (
        <Container className="mb-3">
            <Navigation url={'/series'} />

            <Tabs
                defaultActiveKey="series"
                className="my-3"
            >
                <Tab eventKey="series" title="Mes séries">
                    <ShowsRow />
                </Tab>
                <Tab eventKey="continue" title="A continuer">
                    <ShowsToContinue />
                </Tab>
                <Tab eventKey="not-started" title="Non commencées">
                    <NotStartedShowsRow />
                </Tab>
            </Tabs>
        </Container>
    );
};