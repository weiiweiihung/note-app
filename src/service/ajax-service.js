import axios from "axios";

const AjsxService = {
    async post(url, data, callBack, errorCallBack){
        await axios.post(url, data, {
            headers: {
                targetURL: window.location.href,
                pageAction: window.location.pathname
            }
        }).then((res) =>{
            callBack(res.data);
        }).catch((err)=>{
            if(errorCallBack){
                errorCallBack(err);
            }
        });
    }
} 