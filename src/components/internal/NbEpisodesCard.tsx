import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import statService from "../../services/statService";
import { errorToast } from "../../helpers/toasts";

export default function NbEpisodesCard() {
    const [num, setNum] = useState<number>(0);
    
    useEffect(() => {
        getNbEpisodes();
    }, []);

    const getNbEpisodes = async () => {
        const resp = await statService.getCountByType("episodes");

        if (resp.status === 200) {
            setNum(await resp.json());
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <>
            <Card className="mt-2">
                <Card.Body>
                    <Card.Title>{num} épisodes</Card.Title>
                </Card.Body>
            </Card>
        </>
    );
}