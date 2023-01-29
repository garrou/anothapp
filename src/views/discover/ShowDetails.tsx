import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Guard from "../../components/Guard";
import DetailsPage from "../../components/apiShow/ApiShowPage";
import { ApiShowDetails } from "../../models/apiShow/ApiShowDetails";
import searchService from "../../services/searchService";

export default function ShowDetails() {
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
        <>   
            <Guard />
            {show && <DetailsPage details={show} isDiscover={true} />}
        </>
    );
};