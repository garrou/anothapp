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

export default {
    checkUser,
    getUser,
    login, 
    register,
}