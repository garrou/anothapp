import { useEffect, useState } from "react";
import { Image, Table } from "react-bootstrap";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import { ShowContinue } from "../../models/internal/ShowContinue";
import showService from "../../services/showService";
import AlertError from "../AlertError";
import Loading from "../Loading";

export default function ShowsToContinue() {
    const [shows, setShows] = useState<ShowContinue[]>([]);
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [error, setError] = useState<ErrorMessage|null>(null);

    useEffect(() => {
        getShowsToContinue();
    }, []);

    const getShowsToContinue = async () => {
        const resp = await showService.getShowsToContinue();

        if (resp.status === 200) {
            const data: ShowContinue[] = await resp.json();
            setShows(data);
            setIsLoad(false);
        } else {
            setError(await resp.json());
        }
    }

    return (
        <>
            {isLoad && !error && <Loading />}

            {error && <AlertError message={error.message} />}

            <Table className="mt-3">
                <tbody>
                    {shows.map(s => (
                        <tr key={s.id} className="align-middle">
                            <td>
                                <Image src={s.poster} alt="Poster" height={75} width={75} fluid={true} />
                            </td>
                            <td>
                                <a href={`/series/${s.id}`} className="text-dark">{s.title}</a>
                            </td>
                            <td>A voir : {s.nb} saison(s)</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}