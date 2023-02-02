import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { User } from "../../models/internal/User";
import Loading from "../Loading";

export default function UserCard() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const resp = await fetch(`${process.env.REACT_APP_SERVER}/auth/me`, {
            credentials: 'include'
        });
        const data: User = await resp.json();
        setUser(data);
    }

    return (
        <>
            {!user && <Loading />}

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