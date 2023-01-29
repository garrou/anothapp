import { SeasonPreview } from "../models/userShow/SeasonPreview";
import { ApiShowPreview } from "../models/apiShow/ApiShowPreview";

const getShows = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows`, {
        credentials: 'include'
    });
}

const addShow = async (show: ApiShowPreview): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(show)
    });
}

const getShowById = async (id: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${id}`, {
        credentials: 'include'
    });
}

const addSeason = async (id: string, season: SeasonPreview): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${id}/seasons`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(season)
    });
}

export default { addSeason, addShow, getShows, getShowById };