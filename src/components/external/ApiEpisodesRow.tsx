import { useEffect, useState } from "react";
import { ApiEpisodePreview } from "../../models/external/ApiEpisodePreview";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import searchService from "../../services/searchService";
import Loading from "../Loading";
import ApiEpisodeCard from "./ApiEpisodeCard";

interface Props {

    showId: string;

    num: string;
}

export default function ApiEpisodesCards({showId, num }: Props) {
    const [episodes, setEpisodes] = useState<ApiEpisodePreview[]>([]);
    const [error, setError] = useState<ErrorMessage|null>(null);

    useEffect(() => {
        getEpisodes();
    }, []);

    const getEpisodes = async () => {
        const resp = await searchService.getEpisodesByShowIdBySeasonNum(Number(showId), Number(num));

        if (resp.status === 200) {
            const data: ApiEpisodePreview[] = await resp.json();
            setEpisodes(data);
        } else {
            setError(await resp.json());
        }
    }

    return (
        <>
            {error && <Loading />}

            <h3 className="mt-3">Episodes</h3>

            {episodes.map(e => <ApiEpisodeCard key={e.id} episode={e} /> )}
        </>
    );
}