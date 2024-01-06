import storageService from "./storageService";

const setProfilePicture = async (image: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/profile/image`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'image': image
        })
    });
}

const getProfile = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/profile`, { 
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}


export default { 
    getProfile,
    setProfilePicture,
};