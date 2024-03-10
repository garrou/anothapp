import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../helpers/format";
import showService from "../../services/showService";
import { errorToast, successToast } from "../../helpers/toasts";
import Loading from "../Loading";
import ModalConfirm from "./ModalConfirm";
import seasonService from "../../services/seasonService";
import { SeasonInfo } from "../../models/internal/Season";

interface Props {

    showId: string;
    
    num: string;
}

export default function SeasonsInfosCard({ showId, num }: Props) {
    const [infos, setInfos] = useState<SeasonInfo[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [seasonToDelete, setSeasonToDelete] = useState<number>(-1);
    const navigate = useNavigate();

    useEffect(() => {
        getSeasonInfos();
    }, []);

    const checkIfAnySeason = (arr: SeasonInfo[]) => {
        if (arr.length === 0) navigate(`/series/${showId}`, { replace: true });
    }

    const getSeasonInfos = async () => {
        const resp = await showService.getSeasonInfo(Number(showId), Number(num));

        if (resp.status === 200) {
            const data: SeasonInfo[] = await resp.json();
            checkIfAnySeason(data);
            setInfos(data);
        }
    }

    const callModal = (id: number) => {
        setShowModal(true);
        setSeasonToDelete(id);
    }

    const deleteSeason = async () => {
        const resp = await seasonService.deleteSeason(seasonToDelete);

        if (resp.status === 204) {
            infos.splice(infos.findIndex((info) => info.id === seasonToDelete), 1);
            checkIfAnySeason(infos);
            successToast(`Saison ${num} supprimée`);
        } else {
            errorToast(await resp.json());
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

            <Card className="mt-2">
                <Card.Body>
                    <Card.Title>{`Saison ${num}`}</Card.Title>
                    <Card.Subtitle>{`Vue ${infos.length} fois`}</Card.Subtitle>

                    {infos.length > 0 ? <Table striped hover className="mt-3">
                        <tbody>
                            {infos.map(i => (
                                <tr key={i.id}>
                                    <td>{formatDate(i.addedAt)}</td>
                                    <td>
                                        <Button variant="outline-danger" onClick={() => callModal(i.id)}>
                                            <i className="bi-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table> : <Loading />}
                </Card.Body>
            </Card>
        </>
    );
}