import storageService from "./storageService";

const checkUser = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/users/me`, { 
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

const login = async (email: string, password: string) => {
    return fetch(`${process.env.REACT_APP_SERVER}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'email': email,
            'password': password
        })
    });
}

const register = async (email: string, password: string, confirm: string) => {
    return fetch(`${process.env.REACT_APP_SERVER}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'email': email,
            'password': password,
            'confirm': confirm
        })
    });
}

const getUser = async (email: string) => {
    return fetch(`${process.env.REACT_APP_SERVER}/users?email=${email}`, {
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

const setProfilePicture = async (image: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/users/profile/image`, {
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

const getProfile = async (userId?: string): Promise<Response> => {
    const url = userId
        ? `${process.env.REACT_APP_SERVER}/users/${userId}/profile`
        : `${process.env.REACT_APP_SERVER}/users/profile`;
    return fetch(url, { 
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

export default {
    checkUser,
    getUser,
    getProfile,
    login, 
    register,
    setProfilePicture
}