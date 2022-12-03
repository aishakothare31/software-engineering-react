import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/users`;
const USER_API = `${BASE_URL}/user`;
const api = axios.create({
 withCredentials: true
});

export const userTogglesTuitLikes = (uid, tid) =>
   api.put(`${USERS_API}/${uid}/likes/${tid}`)
       .then(response => response.data);

export const findAllTuitsLikedByUser = (userId) => 
    api.get(`${USERS_API}/${userId}/likes`)
        .then(response => response.data);
    
export const hasUserLikedTheTuit = (uid, tid) => {
    return api.get(`${USERS_API}/${uid}/likes/${tid}`).then((response) => {
        return response.data?._id !== undefined;
    });
    };    