import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Guard from "../../components/Guard";
import Navigation from "../../components/Navigation";
import UserCard from "../../components/UserCard";
import { User } from "../../models/User";

export default function Profile() {
    const [user, setUser] = useState<User|null>(null);

    useEffect(() => {
        (async () => {
            const resp = await fetch(`${process.env.REACT_APP_SERVER}/auth/me`, {
                credentials: 'include'
            });
            const data: User = await resp.json();
            setUser(data);
        })();
    }, []);
    return (
        <Container>
            <Guard />
            <Navigation />

            {user && <UserCard name={user.name} email={user.email} />}
        </Container>
    );
};