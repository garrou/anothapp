import { Col, Row } from "react-bootstrap";
import ApiSeasonCard from "./ApiSeasonCard";
import { SeasonPreview } from "../../models/internal/SeasonPreview";
import { ApiShowDetails } from "../../models/external/ApiShowDetails";

interface Props {
    seasons: SeasonPreview[],
    show: ApiShowDetails
}

export default function ApiSeasonsShow({ seasons, show }: Props) {

    return (
        <>
            <Row xs={2} md={3} lg={4} className="mt-4">
                {seasons && seasons.map(s => (
                    <Col key={s.number}>
                        <ApiSeasonCard preview={s} show={show} />
                    </Col>
                ))}
            </Row>
        </>
    );
}