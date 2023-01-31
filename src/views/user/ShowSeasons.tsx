import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ApiSeasonCard from "../../components/api/ApiSeasonCard";
import Loading from "../../components/Loading";
import Navigation from "../../components/Navigation";
import { SeasonPreview } from "../../models/userShow/SeasonPreview";
import searchService from "../../services/searchService";

export default function ShowSeasons() {
    const { id } = useParams();
    const [seasons, setSeasons] = useState<SeasonPreview[]>([]);

    useEffect(() => {
        (async () => {
            const resp = await searchService.getSeasonsByShowId(id!);

            if (resp.status === 200) {
                const data: Array<SeasonPreview> = await resp.json();
                setSeasons(data);
            }
        })();
    }, []);

    return (
        <Container>
            <Navigation />

            {seasons.length === 0 && <Loading />}

            <Row xs={2} md={4} className="mt-4">
                {seasons.map(s => (
                    <Col key={s.number}>
                        <ApiSeasonCard preview={s} showId={id!} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}