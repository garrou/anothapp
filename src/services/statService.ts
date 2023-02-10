const getNbShows = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/count/shows`, {
        credentials: 'include',
    });
}

const getTotalTime = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/time`, {
        credentials: 'include',
    });
}

const getNbSeasonsByYears = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/seasons/years`, {
        credentials: 'include',
    });
}

const getTimeByYears = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/time/years`, {
        credentials: 'include',
    });
}

const getTimeCurrentMonth = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/time/month`, {
        credentials: 'include',
    });
}

const getNbSeasonsByMonth = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/seasons/months`, {
        credentials: 'include',
    });
}

const getNbEpisodesByYear = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/episodes/years`, {
        credentials: 'include',
    });
}

export default {
    getNbEpisodesByYear,
    getNbShows,
    getNbSeasonsByMonth,
    getNbSeasonsByYears,
    getTimeByYears,
    getTimeCurrentMonth,
    getTotalTime
};