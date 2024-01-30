import { buildUrl } from "../helpers/format";
import storageService from "./storageService";

const getCountByType = async (type: string, userId?: string): Promise<Response> => {
    const url = buildUrl(`${process.env.REACT_APP_SERVER}/stats/count?type=${type}`, "id", userId)
    return fetch(url, {
        headers: {
            "Authorization": `Bearer ${storageService.getJwt()}`
        }
    });
}

const getGroupedCountByTypeByPeriod = async (type: string, period: string = "", userId?: string): Promise<Response> => {
    const url = buildUrl(buildUrl(`${process.env.REACT_APP_SERVER}/stats/grouped-count?type=${type}`, "period", period), "id", userId);
    return fetch(url, {
        headers: {
            "Authorization": `Bearer ${storageService.getJwt()}`
        }
    });
}

const getTimeByType = async (type: string, userId?: string): Promise<Response> => {
    const url = buildUrl(`${process.env.REACT_APP_SERVER}/stats/time?type=${type}`, "id", userId);
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