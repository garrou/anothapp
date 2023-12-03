const getCountByType = async (type: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/count?type=${type}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getGroupedCountByTypeByPeriod = async (type: string, period: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/grouped-count?type=${type}&period=${period}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getTimeByType = async (type: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/time?type=${type}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

export default {
    getCountByType,
    getGroupedCountByTypeByPeriod,
    getTimeByType,
};