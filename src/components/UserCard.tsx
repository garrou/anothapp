import { Card } from "react-bootstrap";
import { User } from "../models/User";

export default function UserCard(user: User) {
    return (
        <Card className="mt-4">
            <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                    {user.email}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};