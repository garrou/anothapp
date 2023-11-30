import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../models/internal/ErrorMessage";
import profileService from "../../services/profileService";
import searchService from "../../services/searchService";
import CustomAlert from "../CustomAlert";

interface Props {
    showId: number;
}

export default function ApiImagesRow({ showId }: Props) {
    const [images, setImages] = useState<string[]>([]);
    const [error, setError] = useState<ErrorMessage | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getImagesByShowId(showId);
    }, []);

    const getImagesByShowId = async (id: number) => {
        const resp = await searchService.getImagesByShowId(id);

        if (resp.status === 200) {
            const data: string[] = await resp.json();
            setImages(data);
        } else {
            setError(await resp.json());
        }
    }

    const setProfilePicture = async (image: string) => {
        const resp = await profileService.setProfilePicture(image);

        if (resp.status === 200) {
            navigate('/profile');
        } else {
            setError(await resp.json());
        }
    }

    return (
        <>
            {error && <CustomAlert variant="danger" message={error.message} />}

            {images && <Row xs={2} md={3} lg={4} className="mt-4">
                {images.map(image => (
                    <Col key={image} >
                        <Card className="mt-2">
                            <Card.Img variant="top" src={image} />
                            <Card.Body>
                                <Button onClick={_ => setProfilePicture(image)} variant="outline-dark">Choisir comme image de profil</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>}
        </>
    );
}