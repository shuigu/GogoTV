/**
 * Created by zhuguoqing on 17/5/15.
 *
 * koa库:https://github.com/koajs/koa
 */


const Koa     = require('koa');
const Route   = require('./routers');


const app     = new Koa();
const route   = new Route();


app.use(route.routes());


app.listen(3000);