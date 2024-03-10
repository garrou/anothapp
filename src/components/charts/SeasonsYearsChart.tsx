import { useEffect, useState } from "react";
import statService from "../../services/statService";
import { errorToast } from "../../helpers/toasts";
import CustomChartWrapper from "./generics/CustomChartWrapper";
import { SeasonPreview } from "../../models/internal/Season";
import seasonService from "../../services/seasonService";
import { Modal, Row, Col } from "react-bootstrap";
import SeasonCard from "../internal/SeasonCard";
import { ChartSelection, Stat } from "../../models/internal/Chart";
import { FriendProps } from "../../models/internal/Friend";

export default function SeasonsYearsChart(props: FriendProps) {
    const [seasonsByYears, setSeasonsByYears] = useState<Stat[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState<ChartSelection>();

    useEffect(() => {
        getNbSeasonsByYears();
    }, []);

    const getNbSeasonsByYears = async () => {
        const resp = await statService.getGroupedCountByTypeByPeriod("seasons", "years", props.userId);

        if (resp.status === 200)
            setSeasonsByYears(await resp.json());
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
            {selected && <DetailsModal show={showModal} selected={selected} close={() => setShowModal(false)} />}

            {seasonsByYears.length > 0 ? <CustomChartWrapper
                id="seasons-years-chart"
                color="#f5962a"
                title="Saisons par années"
                data={seasonsByYears}
                legend="Saisons"
                range={25}
                max={100}
                click={handleClick}
            /> : <p className="text-center mt-3">Aucune statistique</p>}
        </>
    );
}

interface Props {

    show: boolean;

    selected: ChartSelection;

    close: () => void;
}

function DetailsModal({ show, selected, close }: Props) {
    const [seasons, setSeasons] = useState<SeasonPreview[]>([]);

    const getSeasonsByYear = async () => {
        const resp = await seasonService.getSeasonsByAddedYear(selected.label);

        if (resp.status === 200)
            setSeasons(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <Modal show={show} dialogClassName="modal-90w" onHide={close} onEnter={getSeasonsByYear}>
            <Modal.Header closeButton>
                <Modal.Title>{selected.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row xs={2} md={3} lg={4}>
                    {seasons.map((season, i) => (
                        <Col key={i} >
                            <SeasonCard preview={season} showId={season.showId} />
                        </Col>
                    ))}
                </Row>
            </Modal.Body>
        </Modal>
    )
}   
