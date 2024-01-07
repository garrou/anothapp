import { Container, Form } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import storageService from "../../services/storageService";
import { useState, useEffect } from "react";
import EpisodesYearChart from "../../components/charts/EpisodesYearChart";
import KindsChart from "../../components/charts/KindsChart";
import SeasonsMonthChart from "../../components/charts/SeasonsMonthChart";
import SeasonsYearsChart from "../../components/charts/SeasonsYearsChart";
import ShowsTimeRankingChart from "../../components/charts/ShowsTimeRankingChart";
import TimeYearsChart from "../../components/charts/TimeYearsChart";
import StatInfos from "../../components/internal/StatInfos";
import { FriendProps } from "../../models/internal/FriendProps";

export default function Stats(props: FriendProps) {
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
            {!props.userId && <Navigation />}

            <StatInfos userId={props.userId} />
            
            <Form.Switch
                className="mt-3"
                id="chart-switch"
                label="Afficher les graphiques"
                checked={displayChart}
                onChange={(e) => setDisplayChart(e.target.checked)}
            />

            {displayChart && <>
                <ShowsTimeRankingChart userId={props.userId} />
                <TimeYearsChart userId={props.userId} />
                <EpisodesYearChart userId={props.userId} />
                <SeasonsYearsChart userId={props.userId} />
                <SeasonsMonthChart userId={props.userId} />
                <KindsChart userId={props.userId} />
            </>}
        </Container>
    )
}