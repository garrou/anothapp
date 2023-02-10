import { Container, Tab, Tabs } from "react-bootstrap";
import ApiDiscoverTitleRow from "../../components/external/ApiDiscoverTitleRow";
import ApiKindsSelect from "../../components/external/ApiKindsSelect";
import Navigation from "../../components/Navigation";

export default function Discover() {

    return (
        <Container className="mb-3">
            <Navigation url={'/discover/series'} />

            <Tabs
                defaultActiveKey="title"
                className="my-3"
            >
                <Tab eventKey="title" title="Chercher par titre">
                    <ApiDiscoverTitleRow />
                </Tab>
                <Tab eventKey="kinds" title="Chercher par genres">
                    <ApiKindsSelect />
                </Tab>
            </Tabs>
        </Container>
    );
};