const discoverShows = (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/discover`, {
        credentials: 'include'
    });
}

const getShowByTitle = (title: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/titles/${title}`, {
        credentials: 'include'
    });
}

const getShowById = (id: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}`, {
        credentials: 'include'
    });
}

const getSeasonsByShowId = (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}/seasons`, {
        credentials: 'include'
    });
}

const getCharactersByShowId = (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}/characters`, {
        credentials: 'include'
    });
}

const getSimilarByShowId = (id: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}/similars`, {
        credentials: 'include'
    });
}

const getEpisodesByShowIdBySeasonNum = (id: number, num: number): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}/seasons/${num}/episodes`, {
        credentials: 'include'
    });
}

const getKinds = (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/kinds`, {
        credentials: 'include'
    });
}

const getShowsByKind = (kind: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/kinds/${kind}`, {
        credentials: 'include'
    });
} 

export default { 
    discoverShows, 
    getCharactersByShowId,
    getEpisodesByShowIdBySeasonNum,
    getKinds,
    getSeasonsByShowId, 
    getShowById, 
    getShowsByKind,
    getShowByTitle,
    getSimilarByShowId
};