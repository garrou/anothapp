    import { Card, Container, Image } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import { useEffect, useState } from "react";
import { errorToast } from "../../helpers/toasts";
import { User } from "../../models/internal/User";
import userService from "../../services/userService";
import Loading from "../../components/Loading";
import { FriendProps } from "../../models/internal/FriendProps";

export default function Profile(props: FriendProps) {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        getUserProfile();
    }, []);

    const getUserProfile = async () => {
        const resp = await userService.getProfile(props.userId);

        if (resp.status === 200)
            setUser(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <Container className="mb-3">
            {!props.userId && <Navigation />}
            
            {user ? <Card className="mt-2">
                {user.picture && <Card.Img src={user.picture} variant="top" alt="Photo de profil" />}
                <Card.Body>
                    <Card.Title>{user.email}</Card.Title>
                </Card.Body>
            </Card> : <Loading />}
        </Container>
    );
};
