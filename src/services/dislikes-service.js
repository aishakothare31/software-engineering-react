import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/users`;
const USER_API = `${BASE_URL}/user`;

const api = axios.create({
 withCredentials: true
});

export const userTogglesTuitDislikes = (uid, tid) =>
   api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
       .then(response => response.data);

export const findTuitsUserDisliked = (userId) =>
    api.get(`${USERS_API}/${userId}/dislikes`)
        .then(response => response.data);
       