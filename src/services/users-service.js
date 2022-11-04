import axios from "axios";
// const BASE_URL = "http://my-node-express-project-env.eba-hxq4pgvm.us-east-1.elasticbeanstalk.com";
// const BASE_URL = "https://software-engineering-node-fa22.herokuapp.com/api";
// const BASE_URL = "http://localhost:4000/api";
const BASE_URL = "https://tuiter-node-fa22-ak.herokuapp.com"
const LOGIN_API = `${BASE_URL}/login`;
const USERS_API = `${BASE_URL}/users`;

export const createUser = (user) =>
  axios.post(`${USERS_API}`, user)
    .then(response => response.data);

export const findAllUsers = async () =>{
  // axios.get(USERS_API)
  //   .then(response => response.data);
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
}

export const findUserById = async (uid) =>{
  // axios.get(`${USERS_API}/${uid}`)
  //   .then(response => response.data);
  const response = await axios.get(`${BASE_URL}/users/${uid}`);
  return response.data;
}
export const deleteUser = (uid) =>
  axios.delete(`${USERS_API}/${uid}`)
    .then(response => response.data);

export const deleteUsersByUsername = (username) =>
  axios.delete(`${USERS_API}/username/${username}`)
    .then(response => response.data);

export const findUserByCredentials = (credentials) =>
  axios.post(`${LOGIN_API}`, credentials)
    .then(response => response.data);

const service = {
  findAllUsers,
  deleteUser,
  deleteUsersByUsername,
  findUserById,createUser
}

export default service;