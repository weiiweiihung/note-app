import LoadingConfig from "@/assets/LoadingConfig";
import store from "@/store";
import { resolve } from "core-js/fn/promise";
import { axios, config } from "vue/types/umd";
import MessageService from "./message-service";

//檢查回傳JSON是否為BLOB
const isJsonBlog = (data) =>
  data instanceof Blob && data.type === "application/json";

//將BLOB物件轉化為JSON(檔案型別呼叫ajax，取後端的返回值做特殊處理)
const fileToJson = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (res) => {
      //成功回傳
      const data = JSON.parse(res.target.result); //解析成JSON物件
      resolve(data);
    };
    reader.onerror = (err) => {
      //失敗回傳
      reject(err);
    };
    reader.readAsText(file, "utf-8"); //照utf-8編碼解析
  });
};

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  //TODO:Token setting
  headers: {
    "Context-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 50000, //request timeout
});

//request interceptor
service.interceptors.request.use(
  (config) => {
    //開啟loading小圈圈
    store.dispatch("toggleLoading", true);
    LoadingConfig.hasLoader = true;
    return config;
  },
  (error) => {
    //送出請求發生錯誤後，關閉loading小圈圈
    LoadingConfig.blockCount--;
    if (LoadingConfig.blockCount <= 0) {
      if (LoadingConfig.hasLoader) {
        store.dispatch("toggleLoading", false);
        LoadingConfig.hasLoader = false;
      }
    }
    MessageService.showError("送出請求發生錯誤");
    return Promise.reject(error)
  }
);

//response interceptor(可以的話拉出到新的response.js)
service.interceptors.response.use(
    response => {
        LoadingConfig.blockCount--;
        if(LoadingConfig.blockCount <= 0){
            LoadingConfig.blockCount = 0
            if(LoadingConfig.hasLoader){
                store.dispatch('toggleLoading', false);
                LoadingConfig.hasLoader = false;
            }
        }
    },
    error => {
        //送出請求錯誤後，關閉Loading小圈圈
        LoadingConfig.blockCount--;
        if(LoadingConfig <= 0){
            LoadingConfig.blockCount = 0;
            if(LoadingConfig.hasLoader){
                store.dispatch('toggleLoading', false);
                LoadingConfig.hasLoader = false;
            }
        }
        return Promise.reject(error);
    }
)

export default service