import axios from "axios";
import BaseUrl from "../config/BaseUrl";

axios.defaults.baseURL = BaseUrl;
axios.defaults.withCredentials = true; // 이 옵션을 사용할 때는 서버쪽에 반드시 출처를 명시해줘야한다.

export const logInAPI = (data) => {
  return axios.post("/user/login", data);
};

export const checkLogInAPI = () => {
  return axios.get("/user/session");
};

export const registerAPI = (data) => {
  return axios.post("/user", data);
};
