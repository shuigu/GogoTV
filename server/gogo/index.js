/**
 * Created by zhuguoqing on 17/5/15.
 *
 * koa库:https://github.com/koajs/koa
 */
const Koa = require('koa');
const app = new Koa();

// response
app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3000);