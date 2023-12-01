import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../helpers/format";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import { SeasonInfo } from "../../models/internal/SeasonInfo";
import showService from "../../services/showService";
import CustomAlert from "../CustomAlert";
import Loading from "../Loading";
import ModalConfirm from "./ModalConfirm";

interface Props {
    showId: string
    num: string
}

export default function SeasonsInfosCard({ showId, num }: Props) {
    const [infos, setInfos] = useState<SeasonInfo[]>([]);
    const [error, setError] = useState<ErrorMessage | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [seasonToDelete, setSeasonToDelete] = useState<number>(-1);

    const navigate = useNavigate();

    useEffect(() => {
        getSeasonInfos();
    }, []);

    const getSeasonInfos = async () => {
        const resp = await showService.getSeasonInfo(Number(showId), Number(num));

        if (resp.status === 200) {
            const data: SeasonInfo[] = await resp.json();
            if (data.length === 0) navigate(`/series/${showId}`, { replace: true });
            setInfos(data);
        }
    }

    const callModal = (id: number) => {
        setShowModal(true);
        setSeasonToDelete(id);
    }

    const deleteSeason = async () => {
        const resp = await showService.deleteSeason(seasonToDelete);

        if (resp.status === 204) {
            infos.splice(infos.findIndex((info) => info.id === seasonToDelete), 1);
        } else { 
            setError(await resp.json());
        }
        setShowModal(false);
    }

    return (
        <>
            <ModalConfirm
                show={showModal}
                title="Supprimer ce visionnage"
                body="Voulez-vous supprimer ce visionnage ?"
                handleClose={() => setShowModal(false)}
                handleConfirm={deleteSeason}
            />

            {error && <CustomAlert variant="danger" message={error.message} />}

            <Card className="mt-2">
                <Card.Body>
                    <Card.Title>{`Saison ${num}`}</Card.Title>
                    <Card.Subtitle>{`Visionnée ${infos.length} fois`}</Card.Subtitle>

                    {infos.length === 0 && <Loading />}

                    <Table striped hover className="mt-3">
                        <tbody>
                            {infos.map(i => (
                                <tr key={i.id}>
                                    <td>{formatDate(i.addedAt)}</td>
                                    <td>
                                        <Button variant="outline-danger" onClick={() => callModal(i.id)}>Supprimer</Button>
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