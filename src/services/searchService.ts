import storageService from "./storageService";

const getHomeImages = () => {
    return fetch(`${process.env.REACT_APP_SERVER}/intro/images`);
}

const discoverShows = (title: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows?title=${title}`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

const getShowById = (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

const getSeasonsByShowId = (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}/seasons`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

const getCharactersByShowId = (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}/characters`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

const getSimilarByShowId = (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}/similars`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

const getEpisodesByShowIdBySeasonNum = (id: number, num: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}/seasons/${num}/episodes`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

const getKinds = (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/kinds`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

const getShowsByKind = (kind: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/kinds/${kind}`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
} 

const getImagesByShowId = (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}/images`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

const getPersonById = (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/persons/${id}`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

export default { 
    discoverShows, 
    getCharactersByShowId,
    getEpisodesByShowIdBySeasonNum,
    getHomeImages,
    getImagesByShowId,
    getKinds,
    getPersonById,
    getSeasonsByShowId, 
    getShowById, 
    getShowsByKind,
    getSimilarByShowId
};