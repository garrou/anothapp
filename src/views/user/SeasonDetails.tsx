import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Navigation from "../../components/Navigation";
import CardSeasonsInfos from "../../components/internal/SeasonsInfosCard";
import ViewingTimeSeasonCard from "../../components/internal/ViewingTimeSeasonCard";

export default function SeasonDetails() {
    const { id, num } = useParams<string>();

    return (
        <Container className="mb-3">
            <Navigation url={'/series'} />

            {id && num && (
                <>
                    <CardSeasonsInfos showId={id} num={num} />
                    <ViewingTimeSeasonCard showId={id} num={num} />
                </>
            )}
        </Container>
    );
}