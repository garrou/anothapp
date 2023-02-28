const getHomeImages = () => {
    return fetch(`${process.env.REACT_APP_SERVER}/intro/images`);
}

const discoverShows = (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/discover`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getShowByTitle = (title: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/titles/${title}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getShowById = (id: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getSeasonsByShowId = (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}/seasons`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getCharactersByShowId = (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}/characters`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getSimilarByShowId = (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}/similars`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getEpisodesByShowIdBySeasonNum = (id: number, num: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}/seasons/${num}/episodes`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getKinds = (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/kinds`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

const getShowsByKind = (kind: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/kinds/${kind}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
} 

const getImagesByShowId = (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}/images`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
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
    getSeasonsByShowId, 
    getShowById, 
    getShowsByKind,
    getShowByTitle,
    getSimilarByShowId
};