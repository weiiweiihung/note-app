<template>
    <div class="login_container">
      <!-- 登入塊 -->
      <div class="login_box">
        <!-- 頭像 -->
  
        <!-- 表單區域 -->
        <v-slide-y-transition appear>
          <v-form ref="loginFormRef" class="login_form">
            <!-- 使用者名稱 -->
            <v-text-field
              v-model="loginForm.username"
              class="mt-10"
              color="secondary"
              :rules="rules.requiredNameRule"
              label="帳號"
              placeholder="請輸入使用者帳號"
              prepend-icon="mdi-face"
              autocomplete="off"
              persistent-placeholder
              @keyup="loginForm.username = loginForm.username.replace(/\s+/g, '')"
            />
            <v-text-field
              v-model="loginForm.password"
              class="mb-8"
              color="secondary"
              :rules="rules.requiredPasswordRule"
              :type="showPassword ? 'text' : 'password'"
              label="密碼"
              placeholder="請輸入密碼"
              prepend-icon="mdi-lock-outline"
              autocomplete="off"
              persistent-placeholder
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @keyup="loginForm.password = loginForm.password.replace(/\s+/g, '')"
              @click:append="showPassword = !showPassword"
            />
            <!-- 按鈕 -->
            <v-col class="d-flex justify-end">
              <v-btn
                depressed
                color="primary"
                class="v-btn--text"
                @click="login()"
              >
                登入
              </v-btn>
            </v-col>
          </v-form>
        </v-slide-y-transition>
      </div>
    </div>
  </template>
  
  <script>
  import AjaxService from '@/service/ajax-service'

  export default {
    data() {
      return {
        showPassword: false,
        redirect: undefined,
        otherQuery: {},
        // 表單資料物件
        loginForm: {
          username: "",
          password: "",
        },
        // 驗證物件
        rules: {
          requiredNameRule: [(v) => !!v || "員工編號為必填欄位"],
          requiredPasswordRule: [(v) => !!v || "密碼為必填欄位"],
        },
      };
    },
    watch: {},
    mounted() {},
    methods: {
      login() {
        AjaxService.post('/hello',
        {
          userName: this.loginForm.username,
          pass: this.loginForm.password
        },
        (response) => {
            console.log(response);
            console.log('response: '+process.env.VUE_APP_BASE_API);
        },
            (error) => {
              console.log(error)
              console.log('err: '+process.env.VUE_APP_BASE_API);
                //MessageService.showSystemError();
            }
        );
        //this.$router.push("/homepage");
      },
    },
  };
  </script>
  <style lang="scss" scoped>
  .login_container {
    background-color: #677380;
    height: 100%;
    width: 100%;
    position: fixed;
  }
  
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #e8ecf0;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  
    .acator_box {
      width: 130px;
      height: 130px;
      border: 1px solid #eeeeee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #dddddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #869191;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eeeeee;
      }
    }
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
  .login_form {
    position: absolute;
    bottom: 0%;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }
  </style>