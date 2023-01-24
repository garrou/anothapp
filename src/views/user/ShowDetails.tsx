import { DetailedHTMLFactory, useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DetailsPage from "../../components/show/DetailsPage";
import { Details } from "../../models/show/Details";

export default function ShowDetails() {
    const { id } = useParams();
    const [show, setShow] = useState<Details | null>(null);

    useEffect(() => {
        (async () => {
            const resp = await fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}`, {
                credentials: 'include'
            });

            if (resp.status == 200) {
                const data: Details = await resp.json();
                console.log(data);
                setShow(data);
            }
        })();
    }, []);
    return (
        <>   
            {show && <DetailsPage details={show} />}
        </>
    );
};