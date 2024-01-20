import { useEffect, useState } from "react";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import { errorToast } from "../../helpers/toasts";
import CustomChartWrapper from "./generics/CustomChartWrapper";
import { Col, Modal, Row } from "react-bootstrap";
import showService from "../../services/showService";
import ShowCard from "../internal/ShowCard";
import { ShowPreview } from "../../models/internal/ShowPreview";
import { ChartSelection } from "../../models/internal/Chart";
import { FriendProps } from "../../models/internal/FriendProps";

export default function KindsChart(props: FriendProps) {
    const [kinds, setKinds] = useState<Stat[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState<ChartSelection>();

    useEffect(() => {
        getKinds();
    }, []);

    const getKinds = async (): Promise<void> => {
        const resp = await statService.getGroupedCountByTypeByPeriod("kinds", props.userId);

        if (resp.status === 200)
            setKinds(await resp.json());
        else
            errorToast(await resp.json());
    }

    const handleClick = (data: any, payload: any) => {
        if (typeof payload === "object") {
            setSelected({
                title: `${payload.payload.label} : ${payload.payload.value}`,
                label: payload.payload.label
            });
        } else if (typeof data === "object") {
            setSelected({
                title: `${data.label} : ${data.value}`,
                label: data.label
            });
        } else {
            return errorToast({ message: "Erreur durant l'affichage" });
        }
        setShowModal(true);
    }

    return (
        <>
            {selected && <DetailsModal selected={selected} show={showModal} close={() => setShowModal(false)} />}

            {kinds.length > 0 ? <CustomChartWrapper
                id="kinds-chart"
                color="#329ea8"
                title="10 genres les plus regardés"
                data={kinds}
                legend="Genres"
                range={50}
                max={200}
                click={handleClick}
            /> : <p className="text-center mt-3">Aucune statistique</p>}
        </>
    );
}


interface Props {

    selected: ChartSelection;

    show: boolean;

    close: () => void;
}

function DetailsModal({ selected, show, close }: Props) {
    const [shows, setShows] = useState<ShowPreview[]>([]);

    const getShowsByKind = async () => {
        const resp = await showService.getShows("", selected.label);

        if (resp.status === 200)
            setShows(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <Modal show={show} dialogClassName="modal-90w" onHide={close} onEnter={getShowsByKind}>
            <Modal.Header closeButton>
                <Modal.Title>{selected.title}</Modal.Title>
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
        </Modal>
    )
}   