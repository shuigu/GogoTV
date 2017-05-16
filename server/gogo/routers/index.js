/**
 * Created by zhuguoqing on 2017/5/16.
 */

const Router = require('koa-router');

var fs    = require("fs");
var path  = require("path");
var filePath = path.resolve('./routers/routes');

class Route {
  // 构造
  constructor() {
    this.router = new Router();
    this.generateRoutes();
  }
  routes(){
    return this.router.routes();
  }
  generateRoutes(){
    fs.readdir(filePath,function(err,files) {
      if (err) {
        console.log('generateRoutes error:',err);
      }
      else{
        files.forEach(function (route) {
          let routePath = "./routes/"+route
          this.configRoute(routePath)
        }.bind(this))
      }
    }.bind(this))
  }
  configRoute(routePath){
    let route = require(routePath);
    let methods = route.methods;
    console.log('configRoute :',route.path,methods)
    methods.forEach(function (method) {
      if (method.toUpperCase() == "GET"){
        this.configGetRoute(route)
      }else if(method.toUpperCase() == "POST"){
        this.configPostRoute(route)
      }
    }.bind(this))
  }
  configGetRoute(route){
    this.router.get(route.path,route.router)
  }
  configPostRoute(route){
    this.router.post(route.path,route.router)
  }
}
module.exports = Route