import Vue from 'vue'

/**
 *  MessageService
 *  用來顯示提示訊息，可設定「標題」與「內容」
 */
const MessageService = {
    showError(){
        let defaultTitle = '帳密錯誤';
        let message = '輸入錯誤，請再次輸入';
        Vue.notify({
            group: 'topRight',
            title: defaultTitle,
            text: message,
            type: 'noti-error'
        });
    },

}
export default MessageService