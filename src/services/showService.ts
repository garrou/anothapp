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

const getShowById = async (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${id}`, {
        credentials: 'include'
    });
}

const addSeason = async (id: number, season: SeasonPreview): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${id}/seasons`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(season)
    });
}

const deleteShow = async (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${id}`, {
        credentials: 'include',
        method: 'DELETE',
    });
}

const getSeasonsByShow = async (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${id}/seasons`, {
        credentials: 'include',
    });
}

const getSeasonInfo = async (id: number, num: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${id}/seasons/${num}`, {
        credentials: 'include',
    });
}

const deleteSeason = async (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/seasons/${id}`, {
        credentials: 'include',
        method: 'DELETE'
    });
}

const getViewedTimeByShowId = async (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${id}/time`, {
        credentials: 'include',
    });
}

const getViewedTimeByShowIdBySeason = async (id: number, num: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${id}/seasons/${num}/time`, {
        credentials: 'include',
    });
}

export default { 
    addSeason, 
    addShow, 
    deleteShow, 
    deleteSeason, 
    getSeasonInfo, 
    getSeasonsByShow, 
    getShows, 
    getShowById,
    getViewedTimeByShowId,
    getViewedTimeByShowIdBySeason
};