import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    const { id } = useParams<string>();
    const [show, setShow] = useState<ApiShowDetails | null>(null);
    const navigate = useNavigate();
    
    const getShow = async () => {
        const resp = await searchService.getShowById(id!);

        if (resp.status === 200) {
            setShow(await resp.json());
        } else {
            errorToast(await resp.json());
        }
    }

    const onClick = async () => {
        const resp = await showService.addShow(show!);

        if (resp.status === 201) {
            navigate(`/series/${show!.id}`);
        } else {
            errorToast(await resp.json());
        }
    };

    useEffect(() => {
        getShow();
    }, []);

    return (
        <Container>
            <Navigation url={'/discover'} />

            {!show && <Loading />}

            {show && <>
                {getImageUrl(show.images) && <Image src={show.images.show ?? getImageUrl(show.images)!} alt="Poster" fluid={true} />}

                <Stack direction="horizontal" gap={3}>
                    <h1 className="header">{show.title}</h1>
                    <Button variant="outline-dark" onClick={onClick}>Ajouter</Button>
                </Stack>
                
                <Tabs
                    defaultActiveKey="infos"
                    className="my-3"
                >
                    <Tab eventKey="infos" title="Informations">
                        <ApiShowInfos show={show} />
                    </Tab>
                    <Tab eventKey="characters" title="Acteurs">
                        <ApiCharactersRow showId={show.id} />
                    </Tab>
                    <Tab eventKey="similar" title="Séries similaires">
                        <ApiSimilarShowTable showId={show.id} />
                    </Tab>
                </Tabs>
            </>}
        </Container>
    );
};