import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { Container, Image, Table } from "react-bootstrap";
import AlertError from "../../components/AlertError";
import Loading from "../../components/Loading";
import Navigation from "../../components/Navigation";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import { ViewedSeasonMonth } from "../../models/internal/ViewedSeasonMonth";
import showService from "../../services/showService";

export default function CurrentMonth() {
    const [seasons, setSeasons] = useState<ViewedSeasonMonth[]>([]);
    const [error, setError] = useState<ErrorMessage | null>(null);
    const [isLoad, setIsLoad] = useState<boolean>(true);

    useEffect(() => {
        getViewedCurrentMonth();
    }, []);

    const getViewedCurrentMonth = async () => {
        const resp = await showService.getViewedCurrentMonth();

        if (resp.status === 200) {
            const data: ViewedSeasonMonth[] = await resp.json();
            setSeasons(data);
            setIsLoad(false);
        } else {
            setError(await resp.json());
        }
    }

    return (
        <Container className="mb-3">
            <Navigation url={'/month'} />

            {error && <AlertError message={error.message} />}

            {isLoad && !error && <Loading />}

            <Table className="mt-3">
                <tbody>
                    {seasons.map(s => (
                        <tr key={s.id * s.number} className="align-middle">
                            <td>
                                <Image src={s.image ?? s.poster} alt="Poster" height={75} width={75} fluid={true} />
                            </td>
                            <td>
                                <a href={`/series/${s.id}`} className="text-dark">{s.title}</a>
                            </td>
                            <td>Saison : {s.number}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};