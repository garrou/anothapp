import { SeasonPreview } from "../models/internal/SeasonPreview";
import { ApiShowPreview } from "../models/external/ApiShowPreview";
import { ApiShowDetails } from "../models/external/ApiShowDetails";

const getShows = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const addShow = async (show: ApiShowPreview): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(show)
    });
}

const getShowsByTitle = async (title: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/titles/${title}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const addSeason = async (show: ApiShowDetails, season: SeasonPreview): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${show.id}/seasons`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
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
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        method: 'DELETE',
    });
}

const getSeasonsByShow = async (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${id}/seasons`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getSeasonInfo = async (id: number, num: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${id}/seasons/${num}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const deleteSeason = async (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/seasons/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        method: 'DELETE'
    });
}

const getViewedTimeByShowId = async (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${id}/time`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getViewedTimeByShowIdBySeason = async (id: number, num: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${id}/seasons/${num}/time`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getToContinue = async () => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/watching`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getViewedCurrentMonth = async () => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/viewed/month`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getNotStartedShows = async () => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/not-started`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getShowsToContinue = async () => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/continue`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

export default { 
    addSeason, 
    addShow, 
    deleteShow, 
    deleteSeason, 
    getNotStartedShows,
    getSeasonInfo, 
    getSeasonsByShow, 
    getShows,
    getShowsByTitle,
    getShowsToContinue,
    getToContinue,
    getViewedCurrentMonth,
    getViewedTimeByShowId,
    getViewedTimeByShowIdBySeason
};