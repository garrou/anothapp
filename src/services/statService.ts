import { buildIdUrl } from "../helpers/format";
import storageService from "./storageService";

const getCountByType = async (type: string, userId?: string): Promise<Response> => {
    const url = buildIdUrl(`${process.env.REACT_APP_SERVER}/stats/count?type=${type}`, userId)
    return fetch(url, {
        headers: {
            "Authorization": `Bearer ${storageService.getJwt()}`
        }
    });
}

const getGroupedCountByTypeByPeriod = async (type: string, period: string = "", userId?: string): Promise<Response> => {
    const url = buildIdUrl(`${process.env.REACT_APP_SERVER}/stats/grouped-count?type=${type}&period=${period}`, userId)
    return fetch(url, {
        headers: {
            "Authorization": `Bearer ${storageService.getJwt()}`
        }
    });
}

const getTimeByType = async (type: string, userId?: string): Promise<Response> => {
    const url = buildIdUrl(`${process.env.REACT_APP_SERVER}/stats/time?type=${type}`, userId)
    return fetch(url, {
        headers: {
            "Authorization": `Bearer ${storageService.getJwt()}`
        }
    });
}

export default {
    getCountByType,
    getGroupedCountByTypeByPeriod,
    getTimeByType,
};