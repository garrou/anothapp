import { useEffect, useState } from "react";
import { Alert, Button, Card, Table } from "react-bootstrap";
import { formatDate } from "../../helpers/format";
import { SeasonInfo } from "../../models/internal/SeasonInfo";
import showService from "../../services/showService";
import Loading from "../Loading";

interface Props {
    showId: string
    num: string
}

export default function SeasonsInfosCard({ showId, num }: Props) {
    const [infos, setInfos] = useState<SeasonInfo[]>([]);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        getSeasonInfos();
    }, []);

    const getSeasonInfos = async () => {
        const resp = await showService.getSeasonInfo(Number(showId), Number(num));

        if (resp.status === 200) {
            const data: Array<SeasonInfo> = await resp.json();
            setInfos(data);
        }
    }

    const deleteSeason = async (id: number) => {

        if (window.confirm('Supprimer le visonnage ?')) {
            const resp = await showService.deleteSeason(id);

            if (resp.status === 204) {
                window.location.reload();
            } else {
                setError(await resp.json());
            }
        }
    }

    return (
        <>
            {error && (
                <Alert variant="danger" className="mt-2">
                    {error.message}
                </Alert>
            )}

            <Card className="mt-2">
                <Card.Body>
                    <Card.Title>{`Saison ${num}`}</Card.Title>
                    <Card.Subtitle>{`Visonnée ${infos.length} fois`}</Card.Subtitle>

                    {infos.length === 0 && <Loading />}

                    <Table striped hover className="mt-3">
                        <tbody>
                            {infos.map(i => (
                                <tr key={i.id}>
                                    <td>{formatDate(i.addedAt)}</td>
                                    <td>
                                        <Button variant="outline-danger" onClick={() => deleteSeason(i.id)}>Supprimer</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    );
}