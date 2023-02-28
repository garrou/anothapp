const getNbShows = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/count/shows`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getTotalTime = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/time`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getNbSeasonsByYears = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/seasons/years`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getTimeByYears = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/time/years`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getTimeCurrentMonth = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/time/month`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getNbSeasonsByMonth = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/seasons/months`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getNbEpisodesByYear = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/episodes/years`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getNbEpisodes = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/count/episodes`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

export default {
    getNbEpisodes,
    getNbEpisodesByYear,
    getNbShows,
    getNbSeasonsByMonth,
    getNbSeasonsByYears,
    getTimeByYears,
    getTimeCurrentMonth,
    getTotalTime
};