import { Card, Container } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { errorToast } from "../../helpers/toasts";
import { User } from "../../models/internal/User";
import profileService from "../../services/profileService";

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getUserProfile();
    }, []);

    const getUserProfile = async () => {
        const resp = await profileService.getProfile();

        if (resp.status === 200)
            setUser(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <Container className="mb-3">
            <Navigation />

            {user ? <Card className="mt-2">
                {user.picture && <Card.Img src={user.picture} variant="top" alt="Photo de profil" />}
                <Card.Body>
                    <Card.Title>{user.email}</Card.Title>
                </Card.Body>
            </Card> : <Loading />}
        </Container>
    );
};
