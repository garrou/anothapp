import { useEffect, useState } from "react";
import { Alert, Button,  Container, Image, Stack } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Navigation from "../../components/Navigation";
import { ApiShowDetails } from "../../models/apiShow/ApiShowDetails";
import searchService from "../../services/searchService";

export default function SeriesDetails() {
    const { id } = useParams<string>();
    const [show, setShow] = useState<ApiShowDetails|null>(null);

    useEffect(() => {
        (async () => {
            const resp = await searchService.getShowById(id!);

            if (resp.status === 200) {
                const data: ApiShowDetails = await resp.json();
                setShow(data);
            }
        })();
    }, []);

    return (
        <Container>
            <Navigation />

            {show && <>
                <Image src={show.images.show} alt="Poster" fluid={true} />
                <Link to={`/discover/series/${show.id}`} className="text-dark"> 
                    <h1 className="header">{show.title}</h1>
                </Link>
                <p className="font-weight-bold">{show.seasons} saisons • {show.network}</p>   

                <Alert variant={show.status === "Ended" ? "success" : "warning"}>
                    {show.status === "Ended" ? "Terminée" : "En cours"}
                </Alert>

                <Button variant="outline-dark" href={`/series/${show.id}/seasons`}>Ajouter une saison</Button>
            </>}
        </Container>
    );
};