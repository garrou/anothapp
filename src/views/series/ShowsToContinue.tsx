import { useEffect, useState } from "react";
import { Button, Container, Image, Table } from "react-bootstrap";
import showService from "../../services/showService";
import Loading from "../../components/Loading";
import Navigation from "../../components/Navigation";
import ModalConfirm from "../../components/internal/ModalConfirm";
import { errorToast, successToast } from "../../helpers/toasts";
import { ShowContinue } from "../../models/internal/Show";

export default function ShowsToContinue() {
    const [shows, setShows] = useState<ShowContinue[]>([]);
    const [isLoad, setIsLoad] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showToStop, setShowToStop] = useState<number>(-1);

    useEffect(() => {
        getShowsToContinue();
    }, []);

    const getShowsToContinue = async () => {
        const resp = await showService.getShowsToContinue();

        if (resp.status === 200) {
            setShows(await resp.json());
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
            <Navigation />
            <ModalConfirm
                show={showModal}
                title="Arrêter la série"
                body="Voulez-vous arrêter cette série ?"
                handleClose={() => setShowModal(false)}
                handleConfirm={stopWatching}
            />

            {isLoad && <Loading />}

            {shows.length > 0 ? <Table className="mt-3">
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
                                <Button variant="outline-danger" onClick={() => callModal(s.id)}>Arrêter</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table> : <p className="text-center mt-3">Vous-êtes à jour</p>}
        </Container>
    );
}