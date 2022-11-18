import axios from "axios";
// const BASE_URL = "http://my-node-express-project-env.eba-hxq4pgvm.us-east-1.elasticbeanstalk.com"
// const BASE_URL = "https://tuiter-node-fa22-ak.herokuapp.com"
// const TUITS_API = `https://tuiter-node-fa22-ak.herokuapp.com/tuits`;
// const USERS_API = `https://tuiter-node-fa22-ak.herokuapp.com/users`;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const TUITS_API = `${BASE_URL}/tuits`;
const USERS_API = `${BASE_URL}/users`;

const api = axios.create({
   withCredentials: true
});

export const findAllTuits = () =>
  axios.get(TUITS_API)
    .then(response => response.data);

export const findTuitById = (tid) =>
  axios.get(`${TUITS_API}/${tid}`)
    .then(response => response.data);

export const findTuitsByUser = (uid) =>
  api.get(`${USERS_API}/${uid}/tuits`)
    .then(response => response.data);

export const createTuitByUser = (uid, tuit) =>
  api.post(`${USERS_API}/${uid}/tuits`, tuit)
    .then(response => response.data);

export const postTuit = () =>
  axios.post(`${TUITS_API}`)
    .then(response=>response.data)

export const updateTuit = (tid, tuit) =>
  axios.put(`${TUITS_API}/${tid}`, tuit)
    .then(response => response.data);

export const deleteTuit = (tid) =>
  axios.delete(`${TUITS_API}/${tid}`)
    .then(response => response.data);

const service = {
  findAllTuits,
  deleteTuit,
  createTuitByUser,
  findTuitById,
  findTuitsByUser
}

export default service;