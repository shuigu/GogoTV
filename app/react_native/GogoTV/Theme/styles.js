/**
 * Created by zhuguoqing on 2017/5/5.
 */


import  colors from './colors'
module.exports = {
  rootView:{
    flex:1
  },
  scrollView:{
    ...colors.scrollViewBkgColor
  },
  childViewCenter:{
    justifyContent:'center',
    alignItems:'center',
  },
  defaultContainer:{
    justifyContent:'center',
    alignItems:'center',
    ...colors.contentViewBkgColor,
    flex:1,
  },
  tabBarView:{
    ...colors.tabBarBkgColor,
    flex:1,
  }
}