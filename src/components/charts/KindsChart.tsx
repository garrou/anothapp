import { useEffect, useState } from "react";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import { errorToast } from "../../helpers/toasts";
import Loading from "../Loading";
import CustomChartWrapper from "./generics/CustomChartWrapper";
import { Col, Modal, Row } from "react-bootstrap";
import showService from "../../services/showService";
import ShowCard from "../internal/ShowCard";
import { ShowPreview } from "../../models/internal/ShowPreview";

export default function KindsChart() {
    const [kinds, setKinds] = useState<Stat[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [shows, setShows] = useState<ShowPreview[]>([]);
    const [selected, setSelected] = useState<string>();

    useEffect(() => {
        getKinds();
    }, []);

    const getKinds = async (): Promise<void> => {
        const resp = await statService.getGroupedCountByTypeByPeriod("kinds");

        if (resp.status === 200)
            setKinds(await resp.json());
        else
            errorToast(await resp.json());
    }

    const handleClick = (data: Stat) => {
        setSelected(data.label);
        setShowModal(true);
    }

    const handleHide = () => {
        setShows([]);
        setShowModal(false);
    }

    const getShowsByKind = async () => {
        const resp = await showService.getShows(0, "", selected);

        if (resp.status === 200)
            setShows(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <>
            <Modal show={showModal} dialogClassName="modal-90w" onHide={handleHide} onEnter={getShowsByKind}>
                {selected && <ModalContent title={selected} shows={shows} />}
            </Modal>

            {kinds.length > 0 ? <CustomChartWrapper
                id="kinds-chart"
                color="#329ea8"
                title="10 genres les plus regardés"
                data={kinds.reverse()}
                legend="Genres"
                range={50}
                max={200}
                click={handleClick}
            /> : <Loading />}
        </>
    );
}


interface Props {

    title: string;

    shows: ShowPreview[];
}

function ModalContent({ title, shows }: Props) {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row xs={2} md={3} lg={4}>
                    {shows.map(show => (
                        <Col key={show.id} >
                            <ShowCard preview={show} />
                        </Col>
                    ))}
                </Row>
            </Modal.Body>
        </>
    )
}   