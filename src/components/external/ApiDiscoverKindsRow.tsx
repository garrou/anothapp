import { useEffect, useLayoutEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { ApiShowKind } from "../../models/external/ApiShowKind";
import { ApiShowPreview } from "../../models/external/ApiShowPreview";
import searchService from "../../services/searchService";
import Loading from "../Loading";
import ApiShowCard from "./ApiShowCard";
import { errorToast } from "../../helpers/toasts";

export default function ApiDiscoverKindsRow() {
    const [kinds, setKinds] = useState<ApiShowKind[]>([]);
    const [shows, setShows] = useState<ApiShowPreview[]>([]);
    const [kind, setKind] = useState<string>("Comedy");

    useEffect(() => {
        getKinds();
        getShowsByKind();
    }, [kind]);

    const getShowsByKind = async () => { 
        const resp = await searchService.getShowsByKind(kind);

        if (resp.status === 200) {
            const data: ApiShowPreview[] = await resp.json();
            setShows(data);
        } else {
            errorToast(await resp.json());
        }
    }

    const getKinds = async () => {

        if (kinds.length !== 0) return

        const resp = await searchService.getKinds();

        if (resp.status === 200) {
            const data = await resp.json();
            const transformed: ApiShowKind[] = Object.entries(data).map(e => new ApiShowKind(e[0], e[1] + ""));
            setKinds(transformed);
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <>
            <Form.Select onChange={(e => setKind(e.target.value))}>
                {kinds.map(k => <option key={k.value} value={k.value}>{k.name}</option>)}
            </Form.Select>

            {shows.length === 0 && <Loading />}

            <Row xs={2} md={3} lg={4} className="mt-3">
                {shows.map(s => (
                    <Col key={s.id} >
                        <ApiShowCard preview={s} />
                    </Col>
                ))}
            </Row>
        </>
    );
}