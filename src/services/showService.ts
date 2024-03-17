import { SeasonPreview } from "../models/internal/Season";
import { ApiShowDetails } from "../models/external/ApiShow";
import storageService from "./storageService";
import { buildUrl } from "../helpers/format";

const getShows = async (title: string = "", kind: string = ""): Promise<Response> => {
    const url = buildUrl(buildUrl(`${process.env.REACT_APP_SERVER}/shows`, "title", title, "?"), "kind", kind)
    return fetch(url, {
        headers: {
            "Authorization": `Bearer ${storageService.getJwt()}`
        }
    });
}

const addShow = async (show: ApiShowDetails): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${storageService.getJwt()}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "id": show.id,
            "title": show.title,
            "images": show.images,
            "kinds": show.kinds.join(";")
        })
    });
}

const addSeason = async (show: ApiShowDetails, season: SeasonPreview): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${show.id}/seasons`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${storageService.getJwt()}`,
            "Content-Type": "application/json",
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
            "Authorization": `Bearer ${storageService.getJwt()}`
        },
        method: "DELETE",
    });
}

const getSeasonsByShow = async (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${id}/seasons`, {
        headers: {
            "Authorization": `Bearer ${storageService.getJwt()}`
        }
    });
}

const getSeasonInfo = async (id: number, num: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${id}/seasons/${num}`, {
        headers: {
            "Authorization": `Bearer ${storageService.getJwt()}`
        }
    });
}

const getViewedTimeByShowId = async (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${id}/time`, {
        headers: {
            "Authorization": `Bearer ${storageService.getJwt()}`
        }
    });
}

const getViewedTimeByShowIdBySeason = async (id: number, num: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${id}/seasons/${num}/time`, {
        headers: {
            "Authorization": `Bearer ${storageService.getJwt()}`
        }
    });
}

const getViewedMonthAgo = async (month: number, userId?: string) => {
    const url = buildUrl(`${process.env.REACT_APP_SERVER}/shows/viewed?month=${month}`, "id", userId)
    return fetch(url, {
        headers: {
            "Authorization": `Bearer ${storageService.getJwt()}`
        }
    });
}

const getNotStartedShows = async () => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/not-started`, {
        headers: {
            "Authorization": `Bearer ${storageService.getJwt()}`
        }
    });
}

const getShowsToContinue = async () => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/continue`, {
        headers: {
            "Authorization": `Bearer ${storageService.getJwt()}`
        }
    });
}

const getShowsToResume = async () => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/resume`, {
        headers: {
            "Authorization": `Bearer ${storageService.getJwt()}`
        }
    });
}

const updateShowsToContinue = async (id: number) => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${id}/watching`, {
        headers: {
            "Authorization": `Bearer ${storageService.getJwt()}`
        },
        method: "PATCH"
    });
}

export default { 
    addSeason, 
    addShow, 
    deleteShow, 
    getNotStartedShows,
    getSeasonInfo, 
    getSeasonsByShow, 
    getShows,
    getShowsToContinue,
    getShowsToResume,
    getViewedMonthAgo,
    getViewedTimeByShowId,
    getViewedTimeByShowIdBySeason,
    updateShowsToContinue
};