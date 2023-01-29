import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiShowPage from "../../components/apiShow/ApiShowPage";
import Guard from "../../components/Guard";
import { ApiShowDetails } from "../../models/apiShow/ApiShowDetails";
import searchService from "../../services/searchService";
import showService from "../../services/showService";

export default function SeriesDetails() {
    const { id } = useParams<string>();
    const [apiShow, setApiShow] = useState<ApiShowDetails|null>(null);
    const [userShow, setUserShow] = useState(null);

    useEffect(() => {
        (async () => {
            const apiResp = await searchService.getShowById(id!);

            if (apiResp.status === 200) {
                setApiShow(await apiResp.json());
            }
            const resp = await showService.getShowById(id!);

            if (resp.status === 200) {
                setUserShow(await resp.json());
            }
        })();
    }, []);

    return (
        <>
            <Guard />
            {apiShow && <ApiShowPage details={apiShow} isDiscover={false} />}
            {console.log(userShow)}
        </>
    );
};