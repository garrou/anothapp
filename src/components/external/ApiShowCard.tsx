import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getImageUrl } from "../../models/external/ApiShowImage";
import showService from "../../services/showService";
import { errorToast } from "../../helpers/toasts";
import { ApiShowDetails } from "../../models/external/ApiShowDetails";

interface Props {
    show: ApiShowDetails
};

export default function ApiShowCard({ show }: Props) {
    const navigate = useNavigate();
    const image = getImageUrl(show.images);

    const onClick = async () => {
        const resp = await showService.addShow(show);

        if (resp.status === 201)
            navigate(`/series/${show.id}`);
        else
            errorToast(await resp.json());
    };

    return (
        <Link to={`/discover/${show.id}`} state={{serie: show}} style={{ textDecoration: 'none', color: 'black' }}>
            <Card className="mt-2">
                {image && <Card.Img variant="top" src={image} />}
                <Card.Body>
                    <Card.Title>{show.title}</Card.Title>
                    <Button variant="outline-dark" onClick={onClick}>
                        <i className="bi-plus"></i>
                    </Button>
                </Card.Body>
            </Card>
        </Link>
    );
};