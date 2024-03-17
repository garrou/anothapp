import { Alert } from "react-bootstrap";
import { ApiShowDetails } from "../../models/external/ApiShow"
import TextCard from "./TextCard";
import { minsToStringHours } from "../../helpers/format";

interface Props {
    show: ApiShowDetails;
}

export default function ApiShowInfos({ show }: Props) {

    return (
        <>
            <p>{show.seasons} saisons • {show.network}</p>

            <Alert variant={show.status === "Ended" ? "success" : "warning"}>
                {show.status === "Ended" ? "Terminée" : "En cours"}
            </Alert>

            {show.episodes && show.duration && <TextCard title="Durée" text={minsToStringHours(show.episodes * show.duration)} />}
            {show.creation && <TextCard title="Création" text={show.creation} />}
            {show.note && <TextCard title="Note" text={`${show.note.toFixed(2)} / 5`} />}
            {show.description && <TextCard title="Synopsis" text={show.description} />}
            {show.kinds && <TextCard title="Genres" text={show.kinds.join(" • ")} />}
        </>
    )
}