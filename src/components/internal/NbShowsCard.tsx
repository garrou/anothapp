import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import statService from "../../services/statService";
import AlertError from "../AlertError";

export default function NbShowsCard() {
    const [num, setNum] = useState<number>(0);
    const [error, setError] = useState<ErrorMessage|null>(null);
    
    useEffect(() => {
        getNbShows();
    }, []);

    const getNbShows = async () => {
        const resp = await statService.getNbShows();

        if (resp.status === 200) {
            setNum(await resp.json());
        } else {
            setError(await resp.json());
        }
    }

    return (
        <>
            {error && <AlertError message={error.message} />}

            <Card className="mt-2">
                <Card.Body>
                    <Card.Title>Séries vues : {num}</Card.Title>
                </Card.Body>
            </Card>
        </>
    );
}