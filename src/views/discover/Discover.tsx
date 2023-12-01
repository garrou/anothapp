import { Container, Tab, Tabs } from "react-bootstrap";
import ApiDiscoverTitleRow from "../../components/external/ApiDiscoverTitleRow";
import ApiDiscoverKindsRow from "../../components/external/ApiDiscoverKindsRow";
import Navigation from "../../components/Navigation";

export default function Discover() {

    return (
        <Container className="mb-3">
            <Navigation url={'/discover'} />

            <Tabs
                defaultActiveKey="title"
                className="my-3"
            >
                <Tab eventKey="title" title="Par titre">
                    <ApiDiscoverTitleRow />
                </Tab>
                <Tab eventKey="kinds" title="Par genres">
                    <ApiDiscoverKindsRow />
                </Tab>
            </Tabs>
        </Container>
    );
};