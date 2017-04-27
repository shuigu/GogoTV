/**
 * Created by zhuguoqing on 17/4/27.
 */
import {AppRegistry}    from 'react-native';
import Recommend        from './MainTab/Recommend'
import VideoLibrary     from './MainTab/VideoLibrary'
import History          from './MainTab/History'

// Mine
import  {
  Mine,
  Login,
} from './Mine'


function RegisterComponent() {
  AppRegistry.registerComponent('recommend',() => Recommend)
  AppRegistry.registerComponent('videoLibrary',() => VideoLibrary)
  AppRegistry.registerComponent('history',() => History)

  // Mine
  AppRegistry.registerComponent('mine',() => Mine)
  AppRegistry.registerComponent('login',() => Login)
}

module.exports = RegisterComponent;






