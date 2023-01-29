import { ApiShowPreview } from "../models/apiShow/ApiShowPreview";

const addShow = async (show: ApiShowPreview): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: show.id,
            title: show.title,
            images: show.images,
            duration: show.duration
        })
    });
}

const getShowById = async (id: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/shows/${id}`, {
        credentials: 'include'
    });
}

export default { addShow, getShowById };