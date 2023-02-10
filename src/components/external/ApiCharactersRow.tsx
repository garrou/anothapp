import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ApiCharacterPreview } from "../../models/external/ApiCharacterPreview";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import searchService from "../../services/searchService";
import AlertError from "../AlertError";
import Loading from "../Loading";
import ApiCharacterCard from "./ApiCharacterCard";

interface Props {
    showId: number
}

export default function ApiCharactersRow({ showId }: Props) {
    const [characters, setCharacters] = useState<ApiCharacterPreview[]>([]);
    const [error, setError] = useState<ErrorMessage|null>(null);

    useEffect(() => {
        getCharacters();
    }, []);

    const getCharacters = async () => {
        const resp = await searchService.getCharactersByShowId(showId);

        if (resp.status === 200) {
            setCharacters(await resp.json());
        } else {
            setError(await resp.json());
        }
    }
    
    return (
        <>
            {characters.length === 0 && <Loading />}

            {error && <AlertError message={error.message} />}

            <Row xs={2} md={4} className="mt-4">
                {characters.map(c => (
                    <Col key={c.id} >
                        <ApiCharacterCard character={c} />
                    </Col>
                ))}
            </Row>
        </>
    );
}