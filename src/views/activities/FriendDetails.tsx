import { Container, Tab, Tabs } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../user/Profile";
import Favorites from "../series/Favorites";
import Stats from "../user/Stats";
import { useEffect, useState } from "react";
import friendService from "../../services/friendService";
import History from "../series/History";

export default function FriendDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [areFriends, setAreFriends] = useState(false);

    useEffect(() => {
        checkAreFriend();
    }, []);

    const checkAreFriend = async () => {
        if (!id) navigate("/friends");
        const resp = await friendService.checkAreFriends(id!);

        if (resp.status === 200) {
            setAreFriends(await resp.json());
            if (!areFriends) navigate("/friends", { replace: true });
        } else {
            navigate("/friends", { replace: true });
        }
    }

    return (
        <Container className="mb-3">
            <Navigation />

            {id && areFriends && <>
                
                <Profile userId={id} />
                <Tabs
                    id="details"
                >
                    <Tab eventKey="favorites" title="Favorites">
                        <Favorites userId={id} />
                    </Tab>
                    <Tab eventKey="history" title="Historique">
                        <History userId={id} />
                    </Tab>
                    <Tab eventKey="stats" title="Stats">
                        <Stats userId={id} />
                    </Tab>
                </Tabs>
            </>}
        </Container>
    )
}