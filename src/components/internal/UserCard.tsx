import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { User } from "../../models/internal/User";
import AlertError from "../AlertError";
import Loading from "../Loading";

export default function UserCard() {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const resp = await fetch(`${process.env.REACT_APP_SERVER}/auth/me`, {
            credentials: 'include'
        });

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

            {error && <AlertError message={error.message} />}

            {user &&
                <Card className="mt-4">
                    <Card.Body>
                        <Card.Title>{user.name}</Card.Title>
                        <Card.Text>
                            {user.email}
                        </Card.Text>
                    </Card.Body>
                </Card>}
        </>
    );
};