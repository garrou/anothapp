import { Button, Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import { ApiShowDetails } from "../../models/external/ApiShow";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import ApiShowCard from "../../components/external/ApiShowCard";
import { errorToast } from "../../helpers/toasts";
import searchService from "../../services/searchService";
import { ApiShowKind } from "../../models/external/ApiShow";
import { TabEventKey } from "../../models/internal/TabEventKey";

export default function Discover() {
    const [key, setKey] = useState(TabEventKey.ApiSearchTitle);

    return (
        <Container className="mb-3">
            <Navigation />

            <Tabs
                activeKey={key}
                className="my-3"
                onSelect={(k) => setKey(k! as TabEventKey)}
            >
                <Tab eventKey={TabEventKey.ApiSearchTitle} title="Par titre">
                    <ApiDiscoverTitleRow />
                </Tab>
                <Tab eventKey={TabEventKey.ApiSearchKind} title="Par genres">
                    <ApiDiscoverKindsRow />
                </Tab>
            </Tabs>
        </Container>
    );
};

function ApiDiscoverTitleRow() {
    const [shows, setShows] = useState<ApiShowDetails[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getShowsToDiscover();
    }, [search]);

    const getShowsToDiscover = async () => {
        const resp = await searchService.discoverShows(search);

        if (resp.status === 200)
            setShows(await resp.json());
        else
            errorToast(await resp.json());
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setShows([]);
        setSearch(e.target.titleSearch.value);
    }

    return (
        <>
            <Form className="mt-3" onSubmit={onSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="titleSearch">
                            <Form.Control type="text" placeholder="Titre de la série" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button variant="outline-dark" type="submit">
                            <i className="bi-search"></i>
                        </Button>
                    </Col>
                </Row>
            </Form>

            {shows.length > 0 ? <Row xs={2} md={3} lg={4}>
                {shows.map(s => (
                    <Col key={s.id} >
                        <ApiShowCard show={s} />
                    </Col>
                ))}
            </Row> : <Loading />}
        </>
    );
}

function ApiDiscoverKindsRow() {
    const [kinds, setKinds] = useState<ApiShowKind[]>([]);
    const [shows, setShows] = useState<ApiShowDetails[]>([]);
    const [kind, setKind] = useState<string>("Action");

    useEffect(() => {
        getKinds();
    }, []);

    useEffect(() => {
        getShowsByKind();
    }, [kind]);

    const getKinds = async () => {
        const resp = await searchService.getKinds();

        if (resp.status === 200)
            setKinds(await resp.json());
        else
            errorToast(await resp.json());
    }

    const getShowsByKind = async () => {
        setShows([]);
        const resp = await searchService.getShowsByKind(kind);

        if (resp.status === 200)
            setShows(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <>
            <Form.Select onChange={(e => setKind(e.target.value))}>
                {kinds.map(k => <option key={k.value} value={k.value}>{k.name}</option>)}
            </Form.Select>

            {shows.length > 0 ? <Row xs={2} md={3} lg={4} className="mt-3">
                {shows.map(s => (
                    <Col key={s.id} >
                        <ApiShowCard show={s} />
                    </Col>
                ))}
            </Row> : <Loading />}
        </>
    );
}