import Vue from 'vue'

/**
 *  MessageService
 *  用來顯示提示訊息，可設定「標題」與「內容」
 */
const MessageService = {
    showLoginError(){
        let defaultTitle = '查無登入帳號';
        let message = '請註冊會員';
        Vue.notify({
            group: 'topRight',
            title: defaultTitle,
            text: message,
            type: 'red'
        });
    },
    showReqHaveToWrite(){
        let defaultTitle = '必填項目未填寫';
        let message = '請再次輸入';
        Vue.notify({
            group: 'topRight',
            title: defaultTitle,
            text: message,
            type: 'red'
        });
    },
    showAddError(){
        let defaultTitle = '新增失敗';
        let message = '請再次輸入';
        Vue.notify({
            group: 'topRight',
            title: defaultTitle,
            text: message,
            type: 'red'
        });
    },
    showAddSucc(){
        let defaultTitle = '新增成功';
        let message = '請登入';
        Vue.notify({
            group: 'topRight',
            title: defaultTitle,
            text: message,
            type: 'blue'
        });
    }
}
export default MessageService