import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ApiSeasonCard from "./ApiSeasonCard";
import Loading from "../Loading";
import { SeasonPreview } from "../../models/internal/SeasonPreview";
import searchService from "../../services/searchService";
import { ApiShowDetails } from "../../models/external/ApiShowDetails";
import AlertError from "../AlertError";

interface Props {
    show: ApiShowDetails
}

export default function ApiSeasonsShow({ show }: Props) {
    const [seasons, setSeasons] = useState<SeasonPreview[]>([]);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const resp = await searchService.getSeasonsByShowId(show.id);

            if (resp.status === 200) {
                const data: Array<SeasonPreview> = await resp.json();
                setSeasons(data);
            } else {
                setError(await resp.json());
            }
        })();
    }, []);

    return (
        <>
            {seasons.length === 0 && <Loading />}

            {error && <AlertError message={error.message} />}
            
            <Row xs={2} md={4} className="mt-4">
                {seasons.map(s => (
                    <Col key={s.number}>
                        <ApiSeasonCard preview={s} show={show} />
                    </Col>
                ))}
            </Row>
        </>
    );
}