const setProfilePicture = async (image: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/profile/image`, {
        credentials: 'include',
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'image': image
        })
    });
}

const getUser = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/auth/me`, { 
        credentials: 'include',
    });
}

export default { 
    getUser,
    setProfilePicture
};