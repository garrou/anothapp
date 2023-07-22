import { useEffect, useState } from "react";
import { Container, Form, Image, Table } from "react-bootstrap";
import AlertError from "../../components/AlertError";
import Loading from "../../components/Loading";
import Navigation from "../../components/Navigation";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import { ViewedSeasonMonth } from "../../models/internal/ViewedSeasonMonth";
import showService from "../../services/showService";

export default function ViewingMonth() {
    const [seasons, setSeasons] = useState<ViewedSeasonMonth[]>([]);
    const [error, setError] = useState<ErrorMessage | null>(null);
    const [isLoad, setIsLoad] = useState<boolean>(false);

    useEffect(() => {
        getViewedMonthAgo(0);
    }, []);

    const onChange = (event: any) => {
        getViewedMonthAgo(event.target.value);
    }

    const getViewedMonthAgo = async (month: number) => {
        setIsLoad(true);
        const resp = await showService.getViewedMonthAgo(month);

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

            <Form.Select aria-label="Shows seen since" onChange={onChange} className="mt-3">
                <option value="0">Séries vues ce mois</option>
                <option value="1">Depuis 1 mois</option>
                <option value="2">Depuis 2 mois</option>
                <option value="3">Depuis 3 mois</option>
                <option value="6">Depuis 6 mois</option>
                <option value="12">Depuis 1 an</option>
            </Form.Select>

            {seasons.length == 0 && <p className="text-center mt-3">Aucun visionnage</p>}
            {seasons.length != 0 && <p className="text-center mt-3">{seasons.length} résultats</p>}

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
                            <td>Saison {s.number}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};