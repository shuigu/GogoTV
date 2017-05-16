/**
 * Created by zhuguoqing on 17/5/15.
 *
 * koa库:https://github.com/koajs/koa
 */


const Koa     = require('koa');
const Route   = require('./routers');
const bodyParser = require('koa-bodyparser');
// 初始化数据库,初始化失败就退出.
const DataBase   = require('./database');

const app     = new Koa();
const route   = new Route();


// body 参数解析
app.use(bodyParser());
// route
app.use(route.routes());


app.listen(3000);