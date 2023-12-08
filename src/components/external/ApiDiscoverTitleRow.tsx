import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ApiShowPreview } from "../../models/external/ApiShowPreview";
import searchService from "../../services/searchService";
import { errorToast } from "../../helpers/toasts";
import Loading from "../Loading";
import ApiShowCard from "./ApiShowCard";

export default function ApiDiscoverTitleRow() {
    const [shows, setShows] = useState<ApiShowPreview[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getShowsToDiscover();
    }, [search]);

    const getShowsToDiscover = async () => {
        const resp: Response = await searchService.discoverShows(search);

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
                            <Form.Control type="text" placeholder="Titre de la série" required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button variant="outline-dark" type="submit">
                            <i className="bi-search"></i>
                        </Button>
                    </Col>
                </Row>
            </Form>

            {shows.length > 0 ? <Row xs={2} md={3} lg={4} className="mt-4">
                {shows.map(s => (
                    <Col key={s.id} >
                        <ApiShowCard preview={s} />
                    </Col>
                ))}
            </Row> : <Loading />}
        </>
    );
}

