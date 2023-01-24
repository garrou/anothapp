import { Card } from "react-bootstrap";

interface Props {
    title: string;

    text: string;
};

export default function TextCard({ title, text }: Props) {
    return (
        <Card className="mb-2">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
            </Card.Body>
        </Card>
    );
};