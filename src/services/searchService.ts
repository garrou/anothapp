const discoverShows = (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/discover`, {
        credentials: 'include'
    });
}

const searchShowByTitle = (title: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/titles/${title}`, {
        credentials: 'include'
    });
}

const getShowById = (id: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/search/shows/${id}`, {
        credentials: 'include'
    });
}

export default { discoverShows, getShowById, searchShowByTitle };