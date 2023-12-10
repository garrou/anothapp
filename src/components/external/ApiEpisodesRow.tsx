import { useEffect, useState } from "react";
import { ApiEpisodePreview } from "../../models/external/ApiEpisodePreview";
import searchService from "../../services/searchService";
import Loading from "../Loading";
import { errorToast } from "../../helpers/toasts";
import { Card } from "react-bootstrap";

interface Props {

    showId: string;

    num: string;
}

export default function ApiEpisodesCards({ showId, num }: Props) {
    const [episodes, setEpisodes] = useState<ApiEpisodePreview[]>([]);

    useEffect(() => {
        getEpisodes();
    }, []);

    const getEpisodes = async () => {
        const resp = await searchService.getEpisodesByShowIdBySeasonNum(Number(showId), Number(num));

        if (resp.status === 200)
            setEpisodes(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <>
            {episodes.length > 0 ? <>
                <h3 className="mt-3">Episodes</h3>
                {episodes.map(episode => (
                    <Card className="mt-2" key={episode.id}>
                        <Card.Body>
                            <Card.Title>{episode.code} • {episode.title} • {episode.global}</Card.Title>
                            <Card.Text>{episode.description}</Card.Text>
                            <Card.Subtitle>{episode.date}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                ))}
            </> : <Loading />}
        </>
    );
}