# GogoTV
## GogoTV是一个在线看直播的开源项目
### 整个项目包括3个工程   
1.iOS客户端  
2.android客户端  
3.服务器  
### 其中客户端用到的技术
object-c、java、nodejs、react-native、javascript 
### 其中服务器用到的技术
nodejs、koa框架、javascript 
### 客户端架构解析  
GogoTV的客户端是基于react-native开发的，react-native是Facebook的一个开源项目。      
通过react-native框架我们可以只写一份代码就能在两端iOS、android运行，并且运行效率还不低。在调试UI方面，react-native开发只需要reload一下就能马上反馈出所作出的UI修改，这个过程只需要几秒钟。相比原生的UI开发调试（重新run）不知方便高效多少倍。  
想更多的了解react-native请移步：http://reactnative.cn/ 
播放库是集成bilibili的一个开源播放库：https://github.com/Bilibili/ijkplayer    
#### 客户端目录结构
app/GogoTV_iOS        ---- iOS的基础框架   
app/GogoTV_Android    ---- android的基础框架    
app/react_native      ---- iOS、android共用的javascript代码；大部分业务逻辑在这里写   
### 服务器架构解析
GogoTV服务器主要用于提供:登录、注册、获取视频列表、添加播放记录、获取播放记录等接口。   
GogoTV服务器是基于koajs框架写的一个http服务器。koajs是一个基于nodejs的http服务器框架   
想更多的了解koajs请移步：http://koa.bootcss.com/ 、https://github.com/koajs/koa    
#### 服务器目录结构
server/doc     ---- 接口文档、数据库设计文档     
server/gogo    ---- 服务器业务代码    
server/sql     ---- 数据库备份   

### 运行代码
1.环境要求   
nodejs7.6以上、pod 1.0以上、xcode、android studio、chrome浏览器、React Developer Tools
2.clone代码
git clone git@github.com:shuigu/GogoTV.git GogoTV
3.下载react-native环境
cd GogoTV/app/react_native
npm install 
npm start
4.运行iOS   
cd GogoaTV/app/GogoTV_iOS 
pod install 
open GogoTV.xcworkspace
5.运行android  
通过android studio 打开 GogoaTV/app/GogoTV_Android
6.服务器运行
cd GogoaTV/server/gogo 
npm install 
npm start





