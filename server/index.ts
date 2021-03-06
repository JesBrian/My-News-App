const Koa = require('koa');
const app = new Koa();

// @ts-ignore
const path = require('path');

// CorsMiddleware - 跨域
const corsMiddleware = require('./middleware/CorsMiddleware');
app.use(corsMiddleware);

// UploadMiddleware - 上传
const koaBody = require('koa-body');
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 209715200    // 设置上传文件大小最大限制，默认 2M [200 * 1024 * 1024]
  }
}));

// const historyApiFallback = require('koa2-history-api-fallback');
// app.use(historyApiFallback());

// 注册路由
const registerRouter = require('./router/index.js');
app.use(registerRouter());

// ResponseMiddleware - 统一处理 ajax api 返回
const responseMiddleware = require('./middleware/ResponseMiddleware');
app.use(responseMiddleware);

// ResponseMiddleware - 请求响应
// const responseMiddleware = require('./middleware/ResponseMiddleware');
// app.use(responseMiddleware);

app.listen(3000, () => {
    console.log('Koa2 API 服务 dev 启动完成 ！\r\n');
});
