import { Alert } from "react-bootstrap";
import { ApiShowDetails } from "../../models/external/ApiShowDetails"
import TextCard from "./TextCard";
import { minsToStringHours } from "../../helpers/format";

interface Props {
    show: ApiShowDetails
}

export default function ApiShowInfos({ show }: Props) {

    return (
        <>
            <p className="font-weight-bold">{show.seasons} saisons • {show.network}</p>

            <Alert variant={show.status === "Ended" ? "success" : "warning"}>
                {show.status === "Ended" ? "Terminée" : "En cours"}
            </Alert>

            <TextCard title="Durée" text={minsToStringHours(show.episodes * show.duration)} />
            <TextCard title="Création" text={show.creation} />
            <TextCard title="Note" text={`${show.note.toFixed(2)} / 5`} />
            <TextCard title="Synopsis" text={show.description} />
            <TextCard title="Genres" text={show.kinds.join(' • ')} />
        </>
    )
}