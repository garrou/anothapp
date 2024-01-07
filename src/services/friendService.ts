import storageService from "./storageService";

const getFriends = async (status: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/friends?status=${status}`, { 
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`
        }
    });
}

const acceptFriendRequest = async (userId: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/friends/${userId}`, { 
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`,
            'Content-Type': 'application/json',
        },
        method: "PATCH",
        body: JSON.stringify({
            "userId": userId
        })
    });
}

const sendFriendRequest = async (userId: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/friends`, { 
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`,
            'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify({
            "userId": userId
        })
    });
}

const deleteFriend = async (userId: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/friends/${userId}`, { 
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`,
        },
        method: "DELETE"
    });
}

const getFriendProfile = async (userId: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/friends/${userId}/profile`, { 
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`,
        },
    });
}

const checkAreFriends = async (userId: string): Promise<Response> => {
    return fetch(`${process.env.REACT_APP_SERVER}/friends/${userId}/accepted`, { 
        headers: {
            'Authorization': `Bearer ${storageService.getJwt()}`,
        },
    });
}


export default {
    acceptFriendRequest,
    checkAreFriends,
    deleteFriend,
    getFriends,
    getFriendProfile,
    sendFriendRequest
}