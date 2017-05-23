/**
 * Created by zhuguoqing on 17/5/20.
 */

var videoList = {
  code: '000000',
  msg: '操作成功',
  datas: [{
    videoId: 1,
    videoName: '香港卫视',
    logoUrl: '',
    screenShotUrl: '',
    score: '8.0',
    describe: '香港卫视直播地址精彩在线',
    playUrl: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
    type: 0
  },
    {
      videoId: 2,
      videoName: '台湾卫视',
      logoUrl: '',
      screenShotUrl: '',
      score: '7.0',
      describe: '台湾卫视直播地址精彩在线',
      playUrl: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
      type: 0
    },
    {
      videoId: 4,
      videoName: '广西卫视',
      logoUrl: '',
      screenShotUrl: '',
      score: '7.6',
      describe: '广西卫视直播地址精彩在线',
      playUrl: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
      type: 0
    },
    {
      videoId: 5,
      videoName: '广东卫视',
      logoUrl: '',
      screenShotUrl: '',
      score: '7.8',
      describe: '广东卫视直播地址精彩在线',
      playUrl: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
      type: 0
    },
    {
      videoId: 6,
      videoName: '湖南卫视',
      logoUrl: '',
      screenShotUrl: '',
      score: '9.3',
      describe: '湖南卫视直播地址精彩在线',
      playUrl: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
      type: 0
    },
    {
      videoId: 7,
      videoName: '湖北卫视',
      logoUrl: '',
      screenShotUrl: '',
      score: '6.9',
      describe: '湖北卫视直播地址精彩在线',
      playUrl: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
      type: 0
    },
    {
      videoId: 8,
      videoName: '江西卫视',
      logoUrl: '',
      screenShotUrl: '',
      score: '7.3',
      describe: '江西卫视直播地址精彩在线',
      playUrl: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
      type: 0
    },
    {
      videoId: 9,
      videoName: '四川卫视',
      logoUrl: '',
      screenShotUrl: '',
      score: '9.0',
      describe: '四川卫视直播地址精彩在线',
      playUrl: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
      type: 0
    },
    {
      videoId: 10,
      videoName: '北京卫视',
      logoUrl: '',
      screenShotUrl: '',
      score: '8.0',
      describe: '北京卫视直播地址精彩在线',
      playUrl: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
      type: 0
    },
    {
      videoId: 11,
      videoName: '云南卫视',
      logoUrl: '',
      screenShotUrl: '',
      score: '8.1',
      describe: '云南卫视直播地址精彩在线',
      playUrl: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
      type: 0
    },
    {
      videoId: 12,
      videoName: '贵州卫视',
      logoUrl: '',
      screenShotUrl: '',
      score: '9.0',
      describe: '贵州卫视直播地址精彩在线',
      playUrl: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
      type: 0
    },
    {
      videoId: 13,
      videoName: '山东卫视',
      logoUrl: '',
      screenShotUrl: '',
      score: '6.1',
      describe: '山东卫视直播地址精彩在线',
      playUrl: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
      type: 0
    },
    {
      videoId: 14,
      videoName: '山西卫视',
      logoUrl: '',
      screenShotUrl: '',
      score: '8.9',
      describe: '山西卫视直播地址精彩在线',
      playUrl: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
      type: 0
    },
    {
      videoId: 15,
      videoName: '天津卫视',
      logoUrl: '',
      screenShotUrl: '',
      score: '7.6',
      describe: '天津卫视直播地址精彩在线',
      playUrl: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
      type: 0
    }]
}
var historyList = {
  code: '000000',
  msg: '操作成功',
  datas: [{
    historyId: 1,
    duration: 4,
    videoId: 1,
    videoName: '香港卫视',
    logoUrl: '',
    screenShotUrl: '',
    playUrl: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
    score: '8.0',
    describe: '香港卫视直播地址精彩在线'
  },
    {
      historyId: 2,
      duration: 3,
      videoId: 5,
      videoName: '广东卫视',
      logoUrl: '',
      screenShotUrl: '',
      playUrl: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
      score: '7.8',
      describe: '广东卫视直播地址精彩在线'
    },
    {
      historyId: 3,
      duration: 2,
      videoId: 4,
      videoName: '广西卫视',
      logoUrl: '',
      screenShotUrl: '',
      playUrl: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
      score: '7.6',
      describe: '广西卫视直播地址精彩在线'
    }]
}
module.exports = {
  videoList,
  historyList,
}
