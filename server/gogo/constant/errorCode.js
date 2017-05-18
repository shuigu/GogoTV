/**
 * Created by zhuguoqing on 2017/5/18.
 */
module.exports = {
  // 通用
  succeed:{
    code:'000000',
    msg:'操作成功',
  },
  dbError:{
    code:'000100',
    msg:'数据库操作失败',
  },
  paramError:{
    code:'000200',
    msg:'参数错误',
  },
  
  // user
  userLoginNoUser:{
    code:'00301',
    msg:'此用户还没注册',
  },
  userLoginPasswordError:{
    code:'00302',
    msg:'密码错误',
  },
  userInfoNotVerifyError:{
    code:'00321',
    msg:'权限不通过',
  }
}