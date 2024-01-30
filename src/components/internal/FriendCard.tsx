import { Button, Card, Modal, Tab, Tabs } from "react-bootstrap";
import { User } from "../../models/internal/User";
import friendService from "../../services/friendService";
import { errorToast, successToast } from "../../helpers/toasts";
import FriendType from "../../models/internal/FriendType";
import { useState } from "react";
import ModalConfirm from "./ModalConfirm";
import Favorites from "../../views/series/Favorites";
import Profile from "../../views/user/Profile";
import Stats from "../../views/user/Stats";
import History from "../../views/series/History";

interface Props {
    user: User;

    type: FriendType;

    notify: () => void;
}

export default function FriendCard({ user, type, notify }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const addFriend = async () => {
        const resp = await friendService.sendFriendRequest(user.id);

        if (resp.status === 201) {
            successToast(`Demande envoyée à ${user.email}`);
            notify();
        } else {
            errorToast(await resp.json());
        }
    }

    const deleteFriend = async () => {
        const resp = await friendService.deleteFriend(user.id);

        if (resp.status === 204) {
            successToast(`Amitié avec ${user.email} supprimée`);
            setShowModal(false);
            notify();
        } else {
            errorToast(await resp.json());
        }
    }

    const acceptFriend = async () => {
        const resp = await friendService.acceptFriendRequest(user.id);

        if (resp.status === 200) {
            successToast(`Demande de ${user.email} acceptée`);
            notify();
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <Card className="mt-2">

            <ModalConfirm
                show={showModal}
                title="Supprimer cet(te) ami(e) ?"
                body="Voulez-vous supprimer cet(te) ami(e) ?"
                handleClose={() => setShowModal(false)}
                handleConfirm={deleteFriend}
            />

            <FriendDetailsModal close={() => setShowDetailsModal(false)} show={showDetailsModal} userId={user.id} />

            {user.picture && <Card.Img variant="top" src={user.picture} />}

            <Card.Body>
                <Card.Subtitle className="mb-2">{user.email}</Card.Subtitle>

                {type === FriendType.Search && <Button variant="outline-dark" onClick={addFriend}>
                    <i className="bi-person-fill-add"></i>
                </Button>}

                {type === FriendType.Receive && <Button variant="outline-success" onClick={acceptFriend}>
                    <i className="bi-person-fill-check"></i>
                </Button>}

                {type === FriendType.Friend && <Button variant="btn btn-outline-dark" onClick={() => setShowDetailsModal(true)}>
                    Voir le profil
                </Button>}

                {[FriendType.Receive, FriendType.Send, FriendType.Friend].includes(type) &&
                    <Button className="mx-1" variant="outline-danger" onClick={() => setShowModal(true)}>
                        <i className="bi-person-fill-x"></i>
                    </Button>
                }
            </Card.Body>
        </Card>
    )
}

interface DetailsProps {

    close: () => void;

    show: boolean;

    userId: string;
}

function FriendDetailsModal(props: DetailsProps) {
    return (
        <Modal show={props.show} dialogClassName="modal-90w" onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>Profil de l'ami</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Profile userId={props.userId} />
                <Tabs
                    id="details"
                >
                    <Tab eventKey="favorites" title="Favorites">
                        <Favorites userId={props.userId} />
                    </Tab>
                    <Tab eventKey="history" title="Historique">
                        <History userId={props.userId} />
                    </Tab>
                    <Tab eventKey="stats" title="Stats">
                        <Stats userId={props.userId} />
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    );
}