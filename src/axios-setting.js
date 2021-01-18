import axiosBase from "axios";

const axios = axiosBase.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1",
  headers: {
    "X-API-KEY": process.env.VUE_APP_API_KEY
  },
  responseType: "json"
});

export default axios;
