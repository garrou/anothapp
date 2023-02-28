const setProfilePicture = async (image: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/profile/image`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
            'image': image
        })
    });
}

const getUser = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/auth/me`, { 
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    });
}

export default { 
    getUser,
    setProfilePicture
};