import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Navigation from "../../components/Navigation";
import CardSeasonsInfos from "../../components/user/SeasonsInfosCard";
import ViewingTimeSeasonCard from "../../components/user/ViewingTimeSeasonCard";

export default function SeasonDetails() {
    const { id, num } = useParams<string>();

    return (
        <Container className="mb-3">
            <Navigation />

            {id && num && (
                <>
                    <CardSeasonsInfos showId={id} num={num} />
                    <ViewingTimeSeasonCard showId={id} num={num} />
                </>
            )}
        </Container>
    );
}