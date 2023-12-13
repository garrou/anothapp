import { useEffect, useState } from "react";
import { Stat } from "../../models/internal/Stat";
import statService from "../../services/statService";
import Loading from "../Loading";
import { errorToast } from "../../helpers/toasts";
import CustomChartWrapper from "./generics/CustomChartWrapper";
import { SeasonPreview } from "../../models/internal/SeasonPreview";
import seasonService from "../../services/seasonService";
import { Modal, Row, Col } from "react-bootstrap";
import SeasonCard from "../internal/SeasonCard";
import { ChartSelection } from "../../models/internal/Chart";

export default function SeasonsYearsChart() {
    const [seasonsByYears, setSeasonsByYears] = useState<Stat[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState<ChartSelection>();
    const [seasons, setSeasons] = useState<SeasonPreview[]>([]);

    useEffect(() => {
        getNbSeasonsByYears();
    }, []);

    const getNbSeasonsByYears = async () => {
        const resp = await statService.getGroupedCountByTypeByPeriod("seasons", "years");

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
            return errorToast({ message: "Erreur durant l'affichage "});
        }
        setShowModal(true);
    }

    const handleHide = () => {
        setSeasons([]);
        setShowModal(false);
    }

    const getSeasonsByYear = async () => {
        if (!selected) return errorToast({ message: "Aucune année selectionnée" });
        const resp = await seasonService.getSeasonsByAddedYear(selected.label);

        if (resp.status === 200)
            setSeasons(await resp.json());
        else
            errorToast(await resp.json());
    }

    return (
        <>
            <Modal show={showModal} dialogClassName="modal-90w" onHide={handleHide} onEnter={getSeasonsByYear}>
                {selected && <ModalContent title={selected.label} seasons={seasons} />}
            </Modal>

            {seasonsByYears.length > 0 ? <CustomChartWrapper
                id="seasons-years-chart"
                color="#f5962a"
                title="Saisons par années"
                data={seasonsByYears}
                legend="Saisons"
                range={25}
                max={100}
                click={handleClick}
            /> : <Loading />}
        </>
    );
}

interface Props {

    title: string;

    seasons: SeasonPreview[];
}

function ModalContent({ title, seasons }: Props) {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
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
        </>
    )
}   
