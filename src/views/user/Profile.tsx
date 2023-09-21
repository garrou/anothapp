import { Col, Container, Row } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import TotalViewingTimeCard from "../../components/internal/TotalViewingTimeCard";
import UserCard from "../../components/internal/UserCard";
import SeasonsYearsChart from "../../components/charts/SeasonsYearsChart";
import TimeYearsChart from "../../components/charts/TimeYearsChart";
import ViewingTimeMonthCard from "../../components/internal/ViewingTimeMonthCard";
import NbShowsCard from "../../components/internal/NbShowsCard";
import SeasonsMonthChart from "../../components/charts/SeasonsMonthChart";
import NbEpisodesCard from "../../components/internal/NbEpisodesCard";
import EpisodesYearChart from "../../components/charts/EpisodesYearChart";
import ShowsTimeRankingChart from "../../components/charts/ShowsTimeRankingChart";

export default function Profile() {

    return (
        <Container className="mb-3">
            <Navigation url={'/profile'} />

            <Row xs={1} md={2} className="mt-4">
                <Col>
                    <UserCard />
                </Col>
                <Col>
                    <ViewingTimeMonthCard />
                    <NbShowsCard />
                    <NbEpisodesCard />
                    <TotalViewingTimeCard /> 
                </Col>
            </Row>

            <ShowsTimeRankingChart />
            <TimeYearsChart />
            <SeasonsYearsChart />
            <EpisodesYearChart />
            <SeasonsMonthChart />
        </Container>
    );
};