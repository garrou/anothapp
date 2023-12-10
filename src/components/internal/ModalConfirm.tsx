import { Button, Modal } from "react-bootstrap"

interface Props {

    show: boolean;
    
    color?: string;
    
    title?: string;
    
    body?: string;
    
    handleClose: VoidFunction;
    
    handleConfirm: VoidFunction;
}

export default function ModalConfirm({
    show, 
    color = "danger", 
    title = "Supprimer la série",
    body = "Voulez supprimer cette série ?",
    handleClose, 
    handleConfirm
}: Props) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Annuler</Button>
                <Button variant={color} onClick={handleConfirm}>Confirmer</Button>
            </Modal.Footer>
        </Modal>
    )
}