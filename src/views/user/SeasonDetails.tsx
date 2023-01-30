import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Navigation from "../../components/Navigation";
import { formatDate } from "../../helpers/format";
import { SeasonInfo } from "../../models/userShow/SeasonInfo";
import showService from "../../services/showService";

export default function SeasonDetails() {
    const { id, num } = useParams();
    const [infos, setInfos] = useState<SeasonInfo[]>([]);

    useEffect(() => {
        getSeasonInfos();
    }, []);

    const getSeasonInfos = async () => {
        const resp = await showService.getSeasonInfo(id!, num!);

        if (resp.status === 200) {
            const data: Array<SeasonInfo> = await resp.json();
            setInfos(data);
        }
    }

    return (
        <Container>
            <Navigation />

            <Table striped hover>
                <thead>
                    <tr>
                        <th>Date de visionnage</th>
                    </tr>
                </thead>
                <tbody>
                    {infos.map(i => <tr key={i.id}><td>{formatDate(i.addedAt)}</td></tr>)}
                </tbody>
            </Table>
        </Container>
    );
}