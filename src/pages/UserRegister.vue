<template>
    <div class="login_container">
      <!-- 登入塊 -->
      <div class="login_box">
        <!-- 頭像 -->
  
        <!-- 表單區域 -->
        <v-slide-y-transition appear>
          <v-container fluid>
						<v-row>
						<v-col cols="12">
							<v-text-field
              v-model="loginForm.custName"
							label="請輸入姓名"
							value=""
              filled
              dense
              color="secondary"
              :rules="rules.requiredNameRule"
							></v-text-field>
						</v-col>
						</v-row>					
            <v-row>
						
						<v-col cols="12">
							<v-text-field
              v-model="loginForm.username"
							label="請輸入Email，未來這會是您的會員帳號"
							value=""
              type="email"
              filled
              dense
              color="secondary"
              :rules="rules.requiredMailRule"
							></v-text-field>
						</v-col>
						</v-row>

						<v-row>
						<v-col cols="12">
							<v-text-field
              v-model="loginForm.password"
							label="請輸入密碼"
							value=""
              filled
              dense
              autocomplete="off"
              persistent-Outlined
              color="secondary"
              :rules="rules.requiredPasswordRule"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @keyup="loginForm.password = loginForm.password.replace(/\s+/g, '')"
              @click:append="showPassword = !showPassword"
							></v-text-field>
						</v-col>
						</v-row>
					
						<v-row>
						<v-col cols="12">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="loginForm.custBirth"
                    label="您的生日"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    filled
                    dense
                    color="secondary"
                    :rules="rules.requiredBirthRule"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="loginForm.custBirth"
                  no-title
                  scrollable
                >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="menu = false"
                >
                Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(date)"
                >
                OK
                  </v-btn>
                </v-date-picker>
              </v-menu>

							<!-- <v-text-field
              v-model="loginForm.custBirth"
							label="您的出生西元年月日"
							value=""
              filled
              dense
              color="secondary"
              :rules="rules.requiredBirthRule"
							></v-text-field> -->
						</v-col>
						</v-row>

            <v-row>
						<v-col cols="12">
							<v-text-field
              v-model="loginForm.custCell"
							label="您的手機號碼"
							value=""
              filled
              dense
              color="secondary"
              :rules="rules.requiredCellRule"
							></v-text-field>
						</v-col>
						</v-row>

            <v-col class="d-flex justify-center">
              <v-btn block
                depressed
                color="primary"
                class="v-btn--text"
                @click="addUser()"
              > 註冊
              </v-btn>
            </v-col>

					</v-container>          
        </v-slide-y-transition>
      </div>
    </div>
  </template>
  
  <script>
  import AjaxService from '@/service/ajax-service'
  import MessageService from '@/service/message-service'

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
          custName:"",
          custCell:"",
          custBirth:"",
        },
        // 驗證物件
        rules: {
          requiredNameRule: [(v) => !!v || "姓名為必填欄位"],
          requiredPasswordRule: [(v) => !!v || "密碼為必填欄位"],
          requiredMailRule: [v => /.+@.+/.test(v) || 'Email格式不正確'],
          requiredBirthRule: [(v) => !!v || "生日為必填欄位"],
          requiredCellRule: [v => /^[0-9]+$/.test(v) || "手機格式不正確，需為: 0900000000"],
        },
        menu:[],
        date:[],
      };
    },
    watch: {},
    mounted() {},
    methods: {
      addUser() {
        AjaxService.post('NOTE010002',
        {
          userName: this.loginForm.username,
          pass: this.loginForm.password,
          custName: this.loginForm.custName,
          custCell: this.loginForm.custCell,
          custBirth: this.loginForm.custBirth,
        },
        (response) => {
          if(response.rc==='N0100021'){ //新增成功
            MessageService.showAddSucc();
            this.$router.push('/UserLogin')
          }
          if(response.rc==='N0100023'){ //新增異常
            MessageService.showReqHaveToWrite();
          }
          if(response.rc==='N0100022'){//新增失敗
            MessageService.showAddError();
          }
          console.log('process.env: '+process.env.VUE_APP_BASE_API);

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
    height: 600px;
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