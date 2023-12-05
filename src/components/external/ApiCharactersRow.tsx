import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ApiCharacterPreview } from "../../models/external/ApiCharacterPreview";
import searchService from "../../services/searchService";
import Loading from "../Loading";
import ApiCharacterCard from "./ApiCharacterCard";
import { errorToast } from "../../helpers/toasts";

interface Props {
    showId: number
}

export default function ApiCharactersRow({ showId }: Props) {
    const [characters, setCharacters] = useState<ApiCharacterPreview[]>([]);

    useEffect(() => {
        getCharacters();
    }, []);

    const getCharacters = async () => {
        const resp = await searchService.getCharactersByShowId(showId);

        if (resp.status === 200) {
            setCharacters(await resp.json());
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <>
            {characters.length > 0 ? <Row xs={2} md={3} lg={4} className="mt-4">
                {characters.map(c => (
                    <Col key={c.id} >
                        <ApiCharacterCard character={c} />
                    </Col>
                ))}
            </Row> : <Loading />}
        </>
    );
}