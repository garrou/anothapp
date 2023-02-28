import { useEffect, useState } from "react";
import { Container, Image, Table } from "react-bootstrap";
import AlertError from "../../components/AlertError";
import Loading from "../../components/Loading";
import Navigation from "../../components/Navigation";
import { ApiSimpleShow } from "../../models/external/ApiSimpleShow";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import showService from "../../services/showService";

export default function WatchList() {
    const [shows, setShows] = useState<ApiSimpleShow[]>([]);
    const [error, setError] = useState<ErrorMessage | null>(null);
    const [isLoad, setIsLoad] = useState<boolean>(true);

    useEffect(() => {
        getShowsToContinue();
    }, []);

    const getShowsToContinue = async () => {
        const resp = await showService.getToContinue();

        if (resp.status === 200) {
            setShows(await resp.json());
            setIsLoad(false);
        } else {
            setError(await resp.json());
        }
    }

    return (
        <Container className="mb-3">
            <Navigation url={'/watchlist'} />

            {error && <AlertError message={error.message} />}

            {isLoad && !error && <Loading />}

            <Table striped hover className="mt-3">
                <tbody>
                    {shows.map(s => (
                        <tr key={s.id}>
                            {s.poster && <td>
                                <Image src={s.poster} alt="Poster" height={75} width={75} fluid={true} />
                            </td>}
                            <td>
                                <a href={`/series/${s.id}`} className="text-dark">{s.title}</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};