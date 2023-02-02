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
    return fetch(`${process.env.REACT_APP_SERVER}/stats/years/time`, {
        credentials: 'include',
    });
}

export default {
    getNbSeasonsByYears,
    getTimeByYears,
    getTotalTime
};