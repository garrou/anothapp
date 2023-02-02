import { Alert } from "react-bootstrap";

interface Props {
    message: string
}

export default function AlertError({ message }: Props) {
    return (
        <Alert variant="danger" className="mt-2">
            {message}
        </Alert>
    );
}