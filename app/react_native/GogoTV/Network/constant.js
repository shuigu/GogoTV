/**
 * Created by zhuguoqing on 2017/5/19.
 */

const API_HOST = 'http://localhost:3000'

module.exports = {
  API_USER_LOGIN:()=>API_HOST+'/api/user/login',

  API_RECOM_LIST:()=>API_HOST+'/api/video/list',

  API_HISTORY_ADD:()=>API_HOST+'/api/history/add',
  API_HISTORY_LIST:()=>API_HOST+'/api/history/list',

}