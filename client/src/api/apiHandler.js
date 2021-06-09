import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

const apiHandler = {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateUser(data) {
    return service
      .patch("/api/auth/settings", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserInfos() {
    return service
      .get("/api/auth/profile")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteUserAccount() {
    return service
      .delete("/api/auth/delete")
      .then((res) => res.data)
      .catch(errorHandler);
  },
};

export default apiHandler;
