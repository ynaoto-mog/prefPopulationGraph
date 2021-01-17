import axiosBase from "axios";
import key from "./key-setting";
const axios = axiosBase.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1",
  headers: {
    "X-API-KEY": key
  },
  responseType: "json"
});

export default axios;
