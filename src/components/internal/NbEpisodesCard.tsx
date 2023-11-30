import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import statService from "../../services/statService";
import CustomAlert from "../CustomAlert";

export default function NbEpisodesCard() {
    const [num, setNum] = useState<number>(0);
    const [error, setError] = useState<ErrorMessage|null>(null);
    
    useEffect(() => {
        getNbEpisodes();
    }, []);

    const getNbEpisodes = async () => {
        const resp = await statService.getNbEpisodes();

        if (resp.status === 200) {
            setNum(await resp.json());
        } else {
            setError(await resp.json());
        }
    }

    return (
        <>
            {error && <CustomAlert variant="danger" message={error.message} />}

            <Card className="mt-2">
                <Card.Body>
                    <Card.Title>{num} épisodes</Card.Title>
                </Card.Body>
            </Card>
        </>
    );
}