import storageService from "./storageService";

const getCountByType = async (type: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/count?type=${type}`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

const getGroupedCountByTypeByPeriod = async (type: string, period: string = ""): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/grouped-count?type=${type}&period=${period}`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

const getTimeByType = async (type: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/time?type=${type}`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

export default {
    getCountByType,
    getGroupedCountByTypeByPeriod,
    getTimeByType,
};