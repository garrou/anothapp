import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { Container, Image, Table } from "react-bootstrap";
import AlertError from "../../components/AlertError";
import Loading from "../../components/Loading";
import Navigation from "../../components/Navigation";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import showService from "../../services/showService";

export default function CurrentMonth() {
    const [seasons, setSeasons] = useState<any>([]);
    const [error, setError] = useState<ErrorMessage | null>(null);
    const [isLoad, setIsLoad] = useState<boolean>(true);

    useEffect(() => {
        getViewedCurrentMonth();
    }, []);

    const getViewedCurrentMonth = async () => {
        const resp = await showService.getViewedCurrentMonth();

        if (resp.status === 200) {
            setSeasons(await resp.json());
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

            <Table striped hover className="mt-3">
                <tbody>
                    {seasons.map((s: { id: number; image: string | undefined; title: string; num: number }) => (
                        <tr key={s.id}>
                            <td>
                                <Image src={s.image} alt="Poster" height={75} width={75} fluid={true} />
                            </td>
                            <td>
                                <a href={`/series/${s.id}`} className="text-dark">{s.title}</a>
                            </td>
                            <td>Saison : {s.num}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};