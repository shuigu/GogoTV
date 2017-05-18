/**
 * Created by zhuguoqing on 2017/5/18.
 */


var {updateVideo} = require('./../../../database/gogo/video')
var ErrorCode = require('./../../../constant/errorCode')

const Paths = require('./../../paths')

async function router(ctx, next) {
  // body Post 参数
  let params = ctx.request.body;
  /*
   * 必须参数
   * params:{
   *   videoId,
   * }
   * */
  if (!params.videoId){
    ctx.body = {
      code:ErrorCode.paramError.code,
      msg:ErrorCode.paramError.msg,
    }
    return;
  }

  let where = {
    id:params.videoId,
  }
  let columnsData = {}
  if(params.videoName){
    columnsData.name = params.videoName;
  }
  if(params.logoUrl){
    columnsData.logoUrl = params.logoUrl;
  }
  if(params.screenShotUrl){
    columnsData.screenShotUrl = params.screenShotUrl;
  }
  if(params.score){
    columnsData.score = params.score;
  }
  if(params.describe){
    columnsData.describe = params.describe;
  }
  if(params.type){
    columnsData.type = params.type;
  }
  ctx.body = await updateVideo(columnsData,where);

}
module.exports = {
  router,
  path:Paths.API_VIDEO_UPDATE,
  methods:["POST"],
}