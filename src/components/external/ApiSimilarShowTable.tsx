import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { ApiSimilarShow } from "../../models/external/ApiShow";
import searchService from "../../services/searchService";
import { errorToast } from "../../helpers/toasts";

export default function ApiSimilarShowTable({ showId }: { showId: number }) {
    const [shows, setShows] = useState<ApiSimilarShow[]>([]);

    useEffect(() => {
        getSimilarsShows();
    }, []);

    const getSimilarsShows = async () => {
        const resp = await searchService.getSimilarByShowId(showId);

        if (resp.status === 200)
            setShows(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <>
            {shows.length === 0 && <p className="text-center">Aucune série similaire</p>}

            <Table striped hover className="mt-3">
                <tbody>
                    {shows.map(s => (
                        <tr key={s.id}>
                            <td>
                                <a href={`/discover/${s.id}`} className="text-dark">{s.title}</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}