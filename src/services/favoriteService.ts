import storageService from "./storageService";

const getFavorites = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/favorites`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

export default {
    getFavorites
}