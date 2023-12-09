import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import searchService from "../../services/searchService";
import Loading from "../Loading";
import ApiShowCard from "./ApiShowCard";
import { errorToast } from "../../helpers/toasts";
import { ApiShowKind } from "../../models/external/ApiShowKind";
import { ApiShowDetails } from "../../models/external/ApiShowDetails";

export default function ApiDiscoverKindsRow() {
    const [kinds, setKinds] = useState<ApiShowKind[]>([]);
    const [shows, setShows] = useState<ApiShowDetails[]>([]);
    const [kind, setKind] = useState<string>("Comedy");

    useEffect(() => {
        getKinds();
        getShowsByKind();
    }, [kind]);

    const getShowsByKind = async () => {
        const resp = await searchService.getShowsByKind(kind);

        if (resp.status === 200)
            setShows(await resp.json());
        else
            errorToast(await resp.json());
    }

    const getKinds = async () => {

        if (kinds.length > 0) return

        const resp = await searchService.getKinds();

        if (resp.status === 200) 
            setKinds(await resp.json());
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