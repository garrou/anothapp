const getTotalTime = async () => {
    return fetch(`${process.env.REACT_APP_SERVER}/stats/time`, {
        credentials: 'include',
    });
}

export default {
    getTotalTime
};