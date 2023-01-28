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

export default { addShow };