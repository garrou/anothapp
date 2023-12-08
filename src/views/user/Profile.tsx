import { Col, Container, Form, Row } from "react-bootstrap";
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
import MonthRecordViewingTime from "../../components/internal/MonthRecordViewingTime";
import KindsChart from "../../components/charts/KindsChart";
import { useEffect, useState } from "react";
import storageService from "../../services/storageService";

export default function Profile() {
    const [displayChart, setDisplayChart] = useState(true);
    const [isFirst, setIsFirst] = useState(true);

    useEffect(() => {
        if (isFirst) {
            setDisplayChart(storageService.getDisplayChart());
            setIsFirst(false);
        }
        storageService.storeDisplayChart(displayChart);
    }, [displayChart]);

    return (
        <Container className="mb-3">
            <Navigation url={'/profile'} />

            <Row xs={1} md={2} className="mt-4">
                <Col>
                    <UserCard />

                    <Form.Switch
                        className="mt-3"
                        type="switch"
                        id="chart-switch"
                        label="Afficher les graphiques"
                        checked={displayChart}
                        onChange={(e) => setDisplayChart(e.target.checked)}
                    />
                </Col>
                <Col>
                    <ViewingTimeMonthCard />
                    <NbShowsCard />
                    <NbEpisodesCard />
                    <TotalViewingTimeCard />
                    <MonthRecordViewingTime />
                </Col>
            </Row>

            {displayChart && <>
                <ShowsTimeRankingChart />
                <TimeYearsChart />
                <SeasonsYearsChart />
                <EpisodesYearChart />
                <SeasonsMonthChart />
                <KindsChart />
            </>}
        </Container>
    );
};