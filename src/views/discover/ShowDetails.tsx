import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiShowDetails } from "../../models/external/ApiShowDetails";
import searchService from "../../services/searchService";
import { Button, Container, Stack, Tab, Tabs, Image } from "react-bootstrap";
import Navigation from "../../components/Navigation";
import Loading from "../../components/Loading";
import AlertError from "../../components/AlertError";
import ApiCharactersRow from "../../components/external/ApiCharactersRow";
import ApiShowInfos from "../../components/external/ApiShowInfos";
import showService from "../../services/showService";
import { ErrorMessage } from "../../models/internal/ErrorMessage";

export default function ShowDetails() {
    const { id } = useParams<string>();
    const [show, setShow] = useState<ApiShowDetails | null>(null);
    const [error, setError] = useState<ErrorMessage|null>(null);
    const navigate = useNavigate();
    
    const getShow = async () => {
        const resp = await searchService.getShowById(id!);

        if (resp.status === 200) {
            const data: ApiShowDetails = await resp.json();
            setShow(data);
        } else {
            setError(await resp.json());
        }
    }

    const onClick = async () => {
        const resp = await showService.addShow(show!);

        if (resp.status === 201) {
            navigate(`/series/${show!.id}`);
        } else {
            setError(await resp.json());
        }
    };

    useEffect(() => {
        getShow();
    }, []);

    return (
        <Container>
            <Navigation url={'/discover/series'} />

            {!show && !error && <Loading />}

            {error && <AlertError message={error.message} />}

            {show && <>

                <Image src={show.images.show} alt="Poster" fluid={true} />

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
                </Tabs>
            </>}
        </Container>
    );
};