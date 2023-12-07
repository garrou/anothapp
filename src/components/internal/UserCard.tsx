import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { User } from "../../models/internal/User";
import profileService from "../../services/profileService";
import Loading from "../Loading";
import { errorToast } from "../../helpers/toasts";

export default function UserCard() {
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
        <>
            {user ? <Card className="mt-2">
                {user.picture && <Card.Img src={user.picture} variant="top" alt="Photo de profil" />}
                <Card.Body>
                    <Card.Title>{user.email}</Card.Title>
                </Card.Body>
            </Card> : <Loading />}
        </>
    );
};