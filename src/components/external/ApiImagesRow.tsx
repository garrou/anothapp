import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import profileService from "../../services/profileService";
import searchService from "../../services/searchService";
import { errorToast, successToast } from "../../helpers/toasts";

interface Props {
    showId: number;
}

export default function ApiImagesRow({ showId }: Props) {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        getImagesByShowId(showId);
    }, []);

    const getImagesByShowId = async (id: number) => {
        const resp = await searchService.getImagesByShowId(id);

        if (resp.status === 200) {
            setImages(await resp.json());
        } else {
            errorToast(await resp.json());
        }
    }

    const setProfilePicture = async (image: string) => {
        const resp = await profileService.setProfilePicture(image);

        if (resp.status === 200) {
            successToast("Image de profil modifiée");
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <>
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