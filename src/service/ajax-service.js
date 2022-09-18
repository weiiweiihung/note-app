import axios from "axios";

const AjaxService = {
    async post(url, data, callBack, errorCallBack){
        await axios.post(`${process.env.VUE_APP_BASE_API + url}`, data, {
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

export default AjaxService;