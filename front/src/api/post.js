import axios from "axios";
import BaseUrl from "../config/BaseUrl";

axios.defaults.baseURL = BaseUrl;
axios.defaults.withCredentials = true; // 이 옵션을 사용할 때는 서버쪽에 반드시 출처를 명시해줘야한다.

export const loadHomePostsAPI = () => {
  return axios.get("/homepost");
};

export const deleteHomePostAPI = (id) => {
  return axios.delete("/homepost/" + id);
};

export const addHomePostAPI = (data) => {
  return axios.post("/homepost", data);
};
