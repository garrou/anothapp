import { Button, Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import { useEffect, useState } from "react";
import friendService from "../../services/friendService";
import { errorToast, infoToast } from "../../helpers/toasts";
import userService from "../../services/userService";
import { User } from "../../models/internal/User";
import FriendCard from "../../components/internal/FriendCard";
import FriendType from "../../models/internal/FriendType";

export default function Friends() {
    return (
        <Container className="mb-3">
            <Navigation />

            <Tabs
                id="friends"
                className="my-3"
            >
                <Tab eventKey="my-friends" title="Amis">
                    {MyFriends(FriendType.Friend)}
                </Tab>
                <Tab eventKey="search" title="Chercher">
                    {MyFriends(FriendType.Search)}
                </Tab>
                <Tab eventKey="receive" title="Reçues">
                    {MyFriends(FriendType.Receive)}
                </Tab>
                <Tab eventKey="send" title="Envoyées">
                    {MyFriends(FriendType.Send)}
                </Tab>
            </Tabs>
        </Container>
    )
}

function MyFriends(type: FriendType) {
    const [users, setUsers] = useState<User[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getFriends();
    }, [loaded]);

    const notify = () => setLoaded(!notify);

    const onSubmit = async (e: any) => {
        e.preventDefault();
        searchUser(e.target.userSearch.value);
    }

    const getFriends = async () => {
        if (type === FriendType.Search) return
        const resp = await friendService.getFriends(type);

        if (resp.status === 200)
            setUsers(await resp.json());
        else
            errorToast(await resp.json());
    }

    const searchUser = async (email: string) => {
        const resp = await userService.getUser(email);

        if (resp.status === 200)
            setUsers(await resp.json());
        else if (resp.status === 404)
            infoToast(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <>
            {type === FriendType.Search && <Form className="my-3" onSubmit={onSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="userSearch">
                            <Form.Control type="text" placeholder="Email de l'utilisateur" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button variant="outline-dark" type="submit">
                            <i className="bi-search"></i>
                        </Button>
                    </Col>
                </Row>
            </Form>}

            <Row xs={2} md={3} lg={4}>
                {users.map(user => (
                    <Col key={user.id} >
                        <FriendCard user={user} type={type} notify={notify} />
                    </Col>
                ))}
            </Row>
        </>
    )
}