import storageService from "./storageService";

const getFavorites = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/favorites`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

const getFavorite = async (showId: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/favorites/${showId}`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

const addFavorite = async (showId: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/favorites`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "showId": showId 
        })
    }); 
}

const deleteFavorite = async (showId: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/favorites/${showId}`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        },
        method: 'DELETE',
    });
}

export default {
    addFavorite,
    deleteFavorite,
    getFavorite,
    getFavorites
}