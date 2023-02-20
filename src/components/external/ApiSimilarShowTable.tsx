import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { ApiSimilarShow } from "../../models/external/ApiSimilarShow";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import searchService from "../../services/searchService";
import AlertError from "../AlertError";

interface Props {
    showId: number
}

export default function ApiSimilarShowTable({ showId }: Props) {
    const [error, setError] = useState<ErrorMessage | null>(null);
    const [shows, setShows] = useState<ApiSimilarShow[]>([]);

    useEffect(() => {
        getSimilarsShows();
    }, []);

    const getSimilarsShows = async () => {
        const resp = await searchService.getSimilarByShowId(showId);

        if (resp.status === 200) {
            const data: ApiSimilarShow[] = await resp.json();
            setShows(data);
        } else {
            setError(await resp.json());
        }
    }

    return (
        <>
            {error && <AlertError message={error.message} />}

            {shows && <Table striped hover className="mt-3">
                <tbody>
                    {shows.map(s => (
                        <tr key={s.id}>
                            <td>
                                <a href={`/discover/series/${s.id}`} className="text-dark">{s.title}</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>}
        </>
    );
}