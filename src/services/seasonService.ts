import storageService from "./storageService";


const deleteSeason = async (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/seasons/${id}`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        },
        method: 'DELETE'
    });
}

const getSeasonsByAddedYear = async (year: string) => {
    return fetch(`${process.env.REACT_APP_SERVER}/seasons?year=${year}`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

export default { deleteSeason, getSeasonsByAddedYear }