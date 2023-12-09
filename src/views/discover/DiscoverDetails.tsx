import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ApiShowDetails } from "../../models/external/ApiShowDetails";
import searchService from "../../services/searchService";
import { Button, Container, Stack, Tab, Tabs, Image } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import Loading from "../../components/Loading";
import { errorToast } from "../../helpers/toasts";
import ApiCharactersRow from "../../components/external/ApiCharactersRow";
import ApiShowInfos from "../../components/external/ApiShowInfos";
import showService from "../../services/showService";
import { getImageUrl } from "../../models/external/ApiShowImage";
import ApiSimilarShowTable from "../../components/external/ApiSimilarShowTable";

export default function DiscoverDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [show, setShow] = useState<ApiShowDetails>();

    useEffect(() => {
        if (state) {
            const { serie } = state;
            if (serie) setShow(serie);
        } else {
            getShow();
        }
    }, []);

    const getShow = async () => {
        if (!id) return navigate(`/discover`);
        const resp = await searchService.getShowById(id);

        if (resp.status === 200)
            setShow(await resp.json());
        else
            errorToast(await resp.json());
    }

    const onClick = async () => {
        if (!show) return errorToast({ message: "Impossible d'ajouter la série" });
        const resp = await showService.addShow(show);

        if (resp.status === 201)
            navigate(`/series/${show.id}`);
        else
            errorToast(await resp.json());
    };

    return (
        <Container>
            <Navigation url={'/discover'} />

            {show ? <>
                {getImageUrl(show.images) && <Image src={show.images.show ?? getImageUrl(show.images)!} alt="Poster" fluid={true} />}

                <Stack direction="horizontal" gap={3}>
                    <h1 className="header">{show.title}</h1>
                    <Button variant="outline-dark" onClick={onClick}>
                        <i className="bi-plus"></i>
                    </Button>
                </Stack>

                <Tabs
                    defaultActiveKey="infos"
                    className="my-3"
                >
                    <Tab eventKey="infos" title="Infos">
                        <ApiShowInfos show={show} />
                    </Tab>
                    <Tab eventKey="characters" title="Acteurs">
                        <ApiCharactersRow showId={show.id} />
                    </Tab>
                    <Tab eventKey="similar" title="Similaires">
                        <ApiSimilarShowTable showId={show.id} />
                    </Tab>
                </Tabs>
            </> : <Loading />}
        </Container>
    );
};