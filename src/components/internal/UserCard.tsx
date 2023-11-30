import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import { User } from "../../models/internal/User";
import profileService from "../../services/profileService";
import CustomAlert from "../CustomAlert";
import Loading from "../Loading";

export default function UserCard() {
    const [user, setUser] = useState<User|null>(null);
    const [error, setError] = useState<ErrorMessage|null>(null);

    useEffect(() => {
        getUserProfile();
    }, []);

    const getUserProfile = async () => {
        const resp = await profileService.getProfile();

        if (resp.status === 200) {
            const data: User = await resp.json();
            setUser(data);
        } else {
            setError(await resp.json());
        }
    }

    return (
        <>
            {!user && <Loading />}

            {error && <CustomAlert variant="danger" message={error.message} />}

            {user &&
                <Card className="mt-2">
                    {user.picture && <Card.Img src={user.picture} variant="top" alt="Photo de profil" />}
                    <Card.Body>
                        <Card.Title>{user.email}</Card.Title>
                    </Card.Body>
                </Card>}
        </>
    );
};