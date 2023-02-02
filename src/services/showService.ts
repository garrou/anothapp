import { SeasonPreview } from "../models/internal/SeasonPreview";
import { ApiShowPreview } from "../models/external/ApiShowPreview";
import { ApiShowDetails } from "../models/external/ApiShowDetails";

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

const addSeason = async (show: ApiShowDetails, season: SeasonPreview): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${show.id}/seasons`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "number": season.number,
            "episode": season.episode,
            "image": season.image,
            "duration": show.duration
        })
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