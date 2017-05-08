/**
 * Created by zhuguoqing on 17/4/27.
 */
import {AppRegistry}    from 'react-native';

// Recommend
import  {
  Recommend
} from './Recommend'

// VideoLibrary
import {
  VideoLibrary
} from './VideoLibrary'

// History
import {
  History
} from './History'

// Mine
import  {
  Mine,
  MineShowInfo,
} from './Mine'

function RegisterComponent() {
  // recommend
  AppRegistry.registerComponent('recommend',() => Recommend)

  // videoLibrary
  AppRegistry.registerComponent('videoLibrary',() => VideoLibrary)

  // history
  AppRegistry.registerComponent('history',() => History)

  // Mine
  AppRegistry.registerComponent('mine',() => Mine)
  AppRegistry.registerComponent('mineShowInfo',() => MineShowInfo)
}

module.exports = RegisterComponent;






