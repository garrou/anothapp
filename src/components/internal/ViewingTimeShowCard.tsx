import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { minsToStringDays, minsToStringHours } from "../../helpers/format";
import showService from "../../services/showService";
import { errorToast } from "../../helpers/toasts";

interface Props {
    
    showId: number;

    refresh: number;
}

export default function ViewingTimeShowCard({ showId, refresh }: Props) {
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        getViewingTime();
    }, [refresh]);

    const getViewingTime = async () => {
        const resp = await showService.getViewedTimeByShowId(showId);

        if (resp.status === 200)
            setTime(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <>
            <Card className="mt-2">
                <Card.Body>
                    <Card.Title>Temps de visionnage</Card.Title>
                    <Card.Text>
                        {minsToStringHours(time)} • {minsToStringDays(time)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}