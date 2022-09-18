const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    open: true, //前端compile完成是否打開頁面
    port: 9003, //訪問的端口
    host: '127.0.0.1',  //指定的前端地址
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BASE_API,
        ws: false,
        logLevel: 'debug',
      }
    }
  }
})
