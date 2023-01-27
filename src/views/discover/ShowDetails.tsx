import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Guard from "../../components/Guard";
import DetailsPage from "../../components/apiShow/ApiShowPage";
import { ApiShowDetails } from "../../models/apiShow/ApiShowDetails";

export default function ShowDetails() {
    const { id } = useParams();
    const [show, setShow] = useState<ApiShowDetails | null>(null);

    useEffect(() => {
        (async () => {
            const resp = await fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}`, {
                credentials: 'include'
            });

            if (resp.status === 200) {
                const data: ApiShowDetails = await resp.json();
                setShow(data);
            }
        })();
    }, []);
    return (
        <>   
            <Guard />
            {show && <DetailsPage details={show} />}
        </>
    );
};