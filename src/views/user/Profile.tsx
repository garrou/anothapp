import { Container, Tab, Tabs } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import TotalViewingTimeCard from "../../components/internal/TotalViewingTimeCard";
import UserCard from "../../components/internal/UserCard";
import SeasonsYearsChart from "../../components/charts/SeasonsYearsChart";
import TimeYearsChart from "../../components/charts/TimeYearsChart";
import ViewingTimeMonthCard from "../../components/internal/ViewingTimeMonthCard";
import NbShowsCard from "../../components/internal/NbShowsCard";
import SeasonsMonthChart from "../../components/charts/SeasonsMonthChart";

export default function Profile() {

    return (
        <Container className="mb-3">
            <Navigation url={'/profile'} />

            <Tabs
                defaultActiveKey="stats"
                className="my-3"
            >
                <Tab eventKey="stats" title="Statistiques">
                    <ViewingTimeMonthCard />
                    <NbShowsCard />
                    <TotalViewingTimeCard />
                    <TimeYearsChart />
                    <SeasonsYearsChart />
                    <SeasonsMonthChart />
                </Tab>
                <Tab eventKey="add" title="Mon profil">
                    <UserCard />
                </Tab>
            </Tabs>


        </Container>
    );
};