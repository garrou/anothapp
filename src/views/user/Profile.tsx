import { Container, Tab, Tabs } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import TotalViewingTimeCard from "../../components/internal/TotalViewingTimeCard";
import UserCard from "../../components/internal/UserCard";
import SeasonsYearsChart from "../../components/charts/SeasonsYearsChart";
import TimeYearsChart from "../../components/charts/TimeYearsChart";
import ViewingTimeMonthCard from "../../components/internal/ViewingTimeMonthCard";
import NbShowsCard from "../../components/internal/NbShowsCard";

export default function Profile() {

    return (
        <Container className="mb-3">
            <Navigation url={'/profile'} />

            <Tabs
                defaultActiveKey="stats"
                id="uncontrolled-tab-example"
                className="my-3"
            >
                <Tab eventKey="stats" title="Statistiques">
                    <ViewingTimeMonthCard />

                    <NbShowsCard />

                    <TotalViewingTimeCard />
                    
                    <TimeYearsChart />

                    <SeasonsYearsChart />
                </Tab>
                <Tab eventKey="add" title="Mon profil">
                    <UserCard />
                </Tab>
            </Tabs>


        </Container>
    );
};