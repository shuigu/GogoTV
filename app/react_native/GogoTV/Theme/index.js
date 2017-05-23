/**
 * Created by zhuguoqing on 2017/5/5.
 */

import  colors from './colors'
import  styles from './styles'
import  images from './images'


import Dimensions from 'Dimensions';
const SCREEN_WIDTH = Dimensions.get('window').width;



function StyleWithCombine(target,from1,from2,from3,from4) {
  return {...target,...from1,...from2,...from3,...from4}
}


let Grid = {
  A: SCREEN_WIDTH/12,
  a: SCREEN_WIDTH/60,
  aMax:60,
  AMax:12,
};


module.exports = {
  ThemeColors:colors,
  ThemeStyles:styles,
  ThemeImages:images,
  StyleCombine:StyleWithCombine,
  Grid,
}