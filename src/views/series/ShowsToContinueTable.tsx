import { useEffect, useState } from "react";
import { Button, Container, Image, Table } from "react-bootstrap";
import { ShowContinue } from "../../models/internal/ShowContinue";
import showService from "../../services/showService";
import Loading from "../../components/Loading";
import Navigation from "../../components/Navigation";
import ModalConfirm from "../../components/internal/ModalConfirm";
import { errorToast, successToast } from "../../helpers/toasts";

export default function ShowsToContinueTable() {
    const [shows, setShows] = useState<ShowContinue[]>([]);
    const [isLoad, setIsLoad] = useState<boolean>(true);
    
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showToStop, setShowToStop] = useState<number>(-1);

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
            errorToast(await resp.json());
        }
    }

    const callModal = (id: number) => {
        setShowModal(true);
        setShowToStop(id);
    }

    const stopWatching = async () => {
        const resp = await showService.updateShowsToContinue(showToStop);

        if (resp.status === 200) {
            setShowModal(false);
            successToast("Visionnage arrêté");
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <Container>
            <Navigation url={'/continue'} />
            <ModalConfirm
                show={showModal}
                title="Arrêter la série"
                body="Voulez-vous arrêter cette série ?"
                handleClose={() => setShowModal(false)}
                handleConfirm={stopWatching}
            />

            {isLoad && <Loading />}

            {shows.length === 0 && <p className="text-center mt-3">Vous-êtes à jour</p>}

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
                            <td>
                                <Button variant="outline-danger" className="btn-sm" onClick={() => callModal(s.id)}>Arrêter</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}