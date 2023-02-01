import { Container } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import TotalViewingTimeCard from "../../components/user/TotalViewingTimeCard";
import UserCard from "../../components/user/UserCard";

export default function Profile() {
    
    return (
        <Container className="mb-3">
            <Navigation />

            <UserCard />

            <TotalViewingTimeCard />
        </Container>
    );
};