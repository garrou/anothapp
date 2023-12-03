import { useEffect, useState } from "react";
import { Button, Container, Image, Table } from "react-bootstrap";
import showService from "../../services/showService";
import { ShowPreview } from "../../models/internal/ShowPreview";
import Loading from "../../components/Loading";
import Navigation from "../../components/Navigation";
import ModalConfirm from "../../components/internal/ModalConfirm";
import { errorToast, successToast } from "../../helpers/toasts";

export default function ShowsToContinueTable() {
    const [shows, setShows] = useState<ShowPreview[]>([]);
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showToResume, setShowToResume] = useState<number>(-1);

    useEffect(() => {
        getShowsToResume();
    }, []);

    const getShowsToResume = async () => {
        const resp = await showService.getShowsToResume();

        if (resp.status === 200) {
            setShows(await resp.json());
            setIsLoad(false);
        } else {
            errorToast(await resp.json());
        }
    }

    const callModal = (id: number) => {
        setShowModal(true);
        setShowToResume(id);
    }

    const resumeWatching = async () => {
        const resp = await showService.updateShowsToContinue(showToResume);

        if (resp.status === 200) {
            successToast("La série est reprise");
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <Container>
            <Navigation url={'/resume'} />
  
            {isLoad && <Loading />}

            <ModalConfirm
                show={showModal}
                color = "success"
                title="Reprendre la série"
                body="Voulez-vous reprendre cette série ?"
                handleClose={() => setShowModal(false)}
                handleConfirm={resumeWatching}
            />

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
                                <Button variant="outline-success" onClick={() => callModal(s.id)}>Reprendre</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}