import storageService from "./storageService";

const setProfilePicture = async (image: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/profile/image`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storageService.getJwt()}`
        },
        body: JSON.stringify({
            'image': image
        })
    });
}

const checkUser = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/auth/me`, { 
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

const getProfile = async (): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/profile`, { 
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

const register = async (email: string, password: string, confirm: string) => {
    return fetch(`${process.env.REACT_APP_SERVER}/auth/register`, {
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

const login = async (email: string, password: string) => {
    return fetch(`${process.env.REACT_APP_SERVER}/auth/login`, {
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

export default { 
    checkUser,
    getProfile,
    login,
    register,
    setProfilePicture,
};