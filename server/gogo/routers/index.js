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
    this.traverseRoutes(filePath,this.configRoute.bind(this));
  }
  routes(){
    return this.router.routes();
  }
  traverseRoutes(path,handle){
    fs.readdir(path,function(err,files) {
      if (err) {
        console.log('generateRoutes error:',err);
      }
      else{
        files.forEach(function (item) {
          let tmpPath = path + '/' + item;
          fs.stat(tmpPath, function(err1, stats){
            if (stats.isDirectory()) {
              this.traverseRoutes(tmpPath, handle);
            } else {
              handle(tmpPath);
            }
          }.bind(this));
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