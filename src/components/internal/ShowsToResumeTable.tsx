import { useEffect, useState } from "react";
import { Button, Image, Table } from "react-bootstrap";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import showService from "../../services/showService";
import AlertError from "../AlertError";
import Loading from "../Loading";
import { ShowPreview } from "../../models/internal/ShowPreview";

export default function ShowsToContinueTable() {
    const [shows, setShows] = useState<ShowPreview[]>([]);
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [error, setError] = useState<ErrorMessage|null>(null);

    useEffect(() => {
        getShowsToResume();
    }, []);

    const getShowsToResume = async () => {
        const resp = await showService.getShowsToResume();

        if (resp.status === 200) {
            const data: ShowPreview[] = await resp.json();
            setShows(data);
            setIsLoad(false);
        } else {
            setError(await resp.json());
        }
    }

    const resumeWatching = async (id: number) => {
        if (window.confirm('Reprendre la série ?')) {
            const resp = await showService.updateShowsToContinue(id);

            if (resp.status === 200) {
                window.alert("La série est reprise")
            } else {
                setError(await resp.json());
            }
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
                            <td>
                                <Button variant="outline-success" className="btn-sm" onClick={() => resumeWatching(s.id)}>Reprendre la série</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}