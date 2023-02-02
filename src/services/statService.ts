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

export default {
    getNbShows,
    getNbSeasonsByYears,
    getTimeByYears,
    getTimeCurrentMonth,
    getTotalTime
};