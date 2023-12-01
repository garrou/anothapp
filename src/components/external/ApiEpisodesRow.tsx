import { useEffect, useState } from "react";
import { ApiEpisodePreview } from "../../models/external/ApiEpisodePreview";

import searchService from "../../services/searchService";
import Loading from "../Loading";
import ApiEpisodeCard from "./ApiEpisodeCard";
import { errorToast } from "../../helpers/toasts";

interface Props {

    showId: string;

    num: string;
}

export default function ApiEpisodesCards({showId, num }: Props) {
    const [episodes, setEpisodes] = useState<ApiEpisodePreview[]>([]);

    useEffect(() => {
        getEpisodes();
    }, []);

    const getEpisodes = async () => {
        const resp = await searchService.getEpisodesByShowIdBySeasonNum(Number(showId), Number(num));

        if (resp.status === 200) {
            const data: ApiEpisodePreview[] = await resp.json();
            setEpisodes(data);
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <>
            {episodes.length === 0 && <Loading />}

            <h3 className="mt-3">Episodes</h3>

            {episodes.map(e => <ApiEpisodeCard key={e.id} episode={e} /> )}
        </>
    );
}