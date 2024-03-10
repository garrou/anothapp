import { Col, Container, Row } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import { useEffect, useState } from "react";
import favoriteService from "../../services/favoriteService";
import { ShowPreview } from "../../models/internal/Show";
import { errorToast } from "../../helpers/toasts";
import ShowCard from "../../components/internal/ShowCard";
import Loading from "../../components/Loading";
import { FriendProps } from "../../models/internal/Friend";

export default function Favorites({ userId }: FriendProps) {
    const [isLoad, setIsLoad] = useState(false);
    const [shows, setShows] = useState<ShowPreview[]>([]);

    useEffect(() => {
        getFavorites();
    }, []);

    const getFavorites = async () => {
        const resp = await favoriteService.getFavorites(userId);

        if (resp.status === 200) {
            setShows(await resp.json());
            setIsLoad(false);
        } else {
            errorToast(await resp.json());
        }
    }

    return (
        <Container>
            {!userId && <Navigation />}

            {isLoad && <Loading />}

            {shows.length === 0 
                ? <p className="text-center mt-3">Aucune série favorite</p>
                : <p className="text-center mt-3">
                    {shows.length} série{shows.length > 1 && "s"} favorite{shows.length > 1 && "s"}
                </p>
            }

            <Row xs={2} md={3} lg={4}>
                {shows.length > 0 && shows.map(s => (
                    <Col key={s.id} >
                        <ShowCard preview={s} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}