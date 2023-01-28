import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Guard from "../../components/Guard";
import searchService from "../../services/searchService";

export default function SeriesDetails() {
    const { id } = useParams<string>();

    useEffect(() => {
        (async () => {
            const resp = await searchService.getShowById(id!);

            if (resp.status === 200) {

            }
        })();
    }, []);

    return (
        <>
            <Guard />
        </>
    );
};