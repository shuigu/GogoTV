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
const Token   = require('./token');

const app     = new Koa();
const route   = new Route();

global.__dataBase = new DataBase();
global.__token    = new Token();

// body 参数解析
app.use(bodyParser());
// 校验 token
app.use(__token.deal())
// route
app.use(route.routes());


app.listen(3000);