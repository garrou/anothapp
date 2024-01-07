import { Button, Card, Modal } from "react-bootstrap";
import { User } from "../../models/internal/User";
import friendService from "../../services/friendService";
import { errorToast, successToast } from "../../helpers/toasts";
import FriendType from "../../models/internal/FriendType";
import { useState } from "react";
import ModalConfirm from "./ModalConfirm";
import { Link } from "react-router-dom";

interface Props {
    user: User;

    type: FriendType;

    notify: () => void;
}

export default function FriendCard({ user, type, notify }: Props) {
    const [showModal, setShowModal] = useState(false);

    const addFriend = async () => {
        const resp = await friendService.sendFriendRequest(user.id);

        if (resp.status === 201) {
            successToast("Demande envoyée");
            notify();
        } else {
            errorToast(await resp.json());
        }
    }

    const deleteFriend = async () => {
        const resp = await friendService.deleteFriend(user.id);

        if (resp.status === 204) {
            successToast("Ami(e) supprimé(e)");
            setShowModal(false);
            notify();
        } else {
            errorToast(await resp.json());
        }
    }

    const acceptFriend = async () => {
        const resp = await friendService.acceptFriendRequest(user.id);

        if (resp.status === 200) {
            successToast("Demande acceptée");
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

            {user.picture && <Card.Img variant="top" src={user.picture} />}
            
            <Card.Body>
                <Card.Subtitle className="mb-2">{user.email}</Card.Subtitle>

                {type === FriendType.Search && <Button variant="outline-dark" onClick={addFriend}>
                    <i className="bi-person-fill-add"></i>
                </Button>}

                {type === FriendType.Receive && <Button variant="outline-success" onClick={acceptFriend}>
                    <i className="bi-person-fill-check"></i>
                </Button>}

                {type === FriendType.Friend && <Link to={`/friends/${user.id}`} className="btn btn-outline-dark">
                    Voir le profil
                </Link>}

                {[FriendType.Receive, FriendType.Send, FriendType.Friend].includes(type) &&
                    <Button className="mx-1" variant="outline-danger" onClick={() => setShowModal(true)}>
                        <i className="bi-person-fill-x"></i>
                    </Button>
                }
            </Card.Body>
        </Card>
    )
}