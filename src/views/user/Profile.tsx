import { Container } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import TotalViewingTimeCard from "../../components/internal/TotalViewingTimeCard";
import UserCard from "../../components/internal/UserCard";
import SeasonsYearsChart from "../../components/charts/SeasonsYearsChart";
import TimeYearsChart from "../../components/charts/TimeYearsChart";

export default function Profile() {
    
    return (
        <Container className="mb-3">
            <Navigation url={'/profile'} />

            <UserCard />

            <TotalViewingTimeCard />

            <SeasonsYearsChart />

            <TimeYearsChart />
        </Container>
    );
};