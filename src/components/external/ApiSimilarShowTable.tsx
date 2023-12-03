import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { ApiSimilarShow } from "../../models/external/ApiSimilarShow";
import searchService from "../../services/searchService";
import { errorToast } from "../../helpers/toasts";

interface Props {
    showId: number
}

export default function ApiSimilarShowTable({ showId }: Props) {
    const [shows, setShows] = useState<ApiSimilarShow[]>([]);

    useEffect(() => {
        getSimilarsShows();
    }, []);

    const getSimilarsShows = async () => {
        const resp = await searchService.getSimilarByShowId(showId);

        if (resp.status === 200) {
            setShows(await resp.json());
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <>
            {shows && <Table striped hover className="mt-3">
                <tbody>
                    {shows.map(s => (
                        <tr key={s.id}>
                            <td>
                                <a href={`/discover/${s.id}`} className="text-dark">{s.title}</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>}
        </>
    );
}