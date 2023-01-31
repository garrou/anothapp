import { Spinner } from "react-bootstrap";

export default function Loading() {
    return (
        <Spinner animation="border" role="status" className="m-4">
                <span className="visually-hidden">Chargement...</span>
        </Spinner>
    );
}