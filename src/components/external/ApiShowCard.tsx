import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getImageUrl } from "../../models/external/ApiShowImage";
import { ApiShowPreview } from "../../models/external/ApiShowPreview";

import showService from "../../services/showService";
import { errorToast } from "../../helpers/toasts";

interface Props {
    preview: ApiShowPreview
};

export default function ApiShowCard({ preview }: Props) {
    const navigate = useNavigate();
    const image = getImageUrl(preview.images);

    const onClick = async () => {
        const resp = await showService.addShow(preview);

        if (resp.status === 201)
            navigate(`/series/${preview.id}`);
        else
            errorToast(await resp.json());
    };

    return (
        <Link to={`/discover/${preview.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <Card className="mt-2">
                {image && <Card.Img variant="top" src={image} />}
                <Card.Body>
                    <Card.Title>{preview.title}</Card.Title>
                    <Button variant="outline-dark" onClick={onClick}>
                        <i className="bi-plus"></i>
                    </Button>
                </Card.Body>
            </Card>
        </Link>
    );
};