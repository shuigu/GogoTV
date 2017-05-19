# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.17)
# Database: gogo_db
# Generation Time: 2017-05-19 08:16:18 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table user_history_info
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_history_info`;

CREATE TABLE `user_history_info` (
  `history_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '历史记录id',
  `history_duration` int(10) DEFAULT '0' COMMENT '观看时长',
  `user_id` int(10) NOT NULL COMMENT '用户id',
  `video_id` int(10) NOT NULL COMMENT '视频Id',
  `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY (`history_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table user_info
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_info`;

CREATE TABLE `user_info` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户id\n',
  `user_name` varchar(10) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户名字',
  `user_no` varchar(20) NOT NULL DEFAULT '',
  `pass_word` varchar(20) NOT NULL COMMENT '用户密码，MD5加密',
  `user_sex` int(1) DEFAULT '1' COMMENT '性别 1:男 2:女',
  `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_no_UNIQUE` (`user_no`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;

INSERT INTO `user_info` (`user_id`, `user_name`, `user_no`, `pass_word`, `user_sex`, `add_time`)
VALUES
	(1,'朱','zhu','123456',1,'2017-05-19 15:10:08');

/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table video_info
# ------------------------------------------------------------

DROP TABLE IF EXISTS `video_info`;

CREATE TABLE `video_info` (
  `video_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '视频id',
  `video_name` varchar(20) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '视频名字',
  `video_logo_url` varchar(100) DEFAULT '' COMMENT '视频logo地址',
  `video_screen_shot_url` varchar(100) DEFAULT '' COMMENT '视频截屏地址',
  `video_score` varchar(3) DEFAULT '0.0' COMMENT '评分10分制如： 9.3',
  `video_describe` varchar(256) CHARACTER SET utf8 DEFAULT '' COMMENT '视频描述',
  `video_play_url` varchar(100) DEFAULT '' COMMENT '播放链接',
  `video_type` int(3) DEFAULT '0' COMMENT '视频类型，暂时不用',
  `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`video_id`),
  UNIQUE KEY `video_name_UNIQUE` (`video_name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

LOCK TABLES `video_info` WRITE;
/*!40000 ALTER TABLE `video_info` DISABLE KEYS */;

INSERT INTO `video_info` (`video_id`, `video_name`, `video_logo_url`, `video_screen_shot_url`, `video_score`, `video_describe`, `video_play_url`, `video_type`, `add_time`)
VALUES
	(1,'香港卫视','','','8.0','香港卫视直播地址精彩在线','rtmp://live.hkstv.hk.lxdns.com/live/hks',0,'2017-05-19 15:44:38'),
	(2,'台湾卫视','','','7.0','台湾卫视直播地址精彩在线','rtmp://live.hkstv.hk.lxdns.com/live/hks',0,'2017-05-19 16:12:45'),
	(4,'广西卫视','','','7.6','广西卫视直播地址精彩在线','rtmp://live.hkstv.hk.lxdns.com/live/hks',0,'2017-05-19 16:15:14'),
	(5,'广东卫视','','','7.8','广东卫视直播地址精彩在线','rtmp://live.hkstv.hk.lxdns.com/live/hks',0,'2017-05-19 16:15:14'),
	(6,'湖南卫视','','','9.3','湖南卫视直播地址精彩在线','rtmp://live.hkstv.hk.lxdns.com/live/hks',0,'2017-05-19 16:15:14'),
	(7,'湖北卫视','','','6.9','湖北卫视直播地址精彩在线','rtmp://live.hkstv.hk.lxdns.com/live/hks',0,'2017-05-19 16:15:14'),
	(8,'江西卫视','','','7.3','江西卫视直播地址精彩在线','rtmp://live.hkstv.hk.lxdns.com/live/hks',0,'2017-05-19 16:15:14'),
	(9,'四川卫视','','','9.0','四川卫视直播地址精彩在线','rtmp://live.hkstv.hk.lxdns.com/live/hks',0,'2017-05-19 16:15:14'),
	(10,'北京卫视','','','8.0','北京卫视直播地址精彩在线','rtmp://live.hkstv.hk.lxdns.com/live/hks',0,'2017-05-19 16:15:14');

/*!40000 ALTER TABLE `video_info` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
