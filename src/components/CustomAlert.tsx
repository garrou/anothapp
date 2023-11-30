import { Alert } from "react-bootstrap";

interface Props {
    variant: "success" | "danger"
    message: string
}

export default function CustomAlert({ variant, message }: Props) {
    return (
        <Alert variant={variant} className="mt-2">
            {message}
        </Alert>
    );
}