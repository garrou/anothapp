import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { ApiSimilarShow } from "../../models/external/ApiSimilarShow";
import searchService from "../../services/searchService";
import { errorToast } from "../../helpers/toasts";
import TabEventKey from "../../models/internal/TabEventKey";
import { TabProps } from "../../models/internal/TabProps";

export default function ApiSimilarShowTable({ showId, tabKey }: TabProps) {
    const [shows, setShows] = useState<ApiSimilarShow[]>([]);

    useEffect(() => {
        getSimilarsShows();
    }, [tabKey]);

    const getSimilarsShows = async () => {
        if (tabKey !== TabEventKey.ApiSimilars || shows.length > 0) return
        const resp = await searchService.getSimilarByShowId(showId);

        if (resp.status === 200)
            setShows(await resp.json());
        else
            errorToast(await resp.json());
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