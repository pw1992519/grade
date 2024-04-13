# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.23)
# Database: grades
# Generation Time: 2024-04-13 06:32:35 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table admins
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admins`;

CREATE TABLE `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;

INSERT INTO `admins` (`id`, `username`, `pwd`, `created_at`, `updatedAt`)
VALUES
	(1,'admin','123','2024-04-08 00:00:00','2024-04-08 00:00:00');

/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table scores
# ------------------------------------------------------------

DROP TABLE IF EXISTS `scores`;

CREATE TABLE `scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subjectId` varchar(255) DEFAULT NULL,
  `studentId` varchar(255) DEFAULT NULL,
  `score` float DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `scores` WRITE;
/*!40000 ALTER TABLE `scores` DISABLE KEYS */;

INSERT INTO `scores` (`id`, `subjectId`, `studentId`, `score`, `created_at`, `updatedAt`)
VALUES
	(1,'3','3',80,'2024-04-10 10:44:14','2024-04-10 10:44:14');

/*!40000 ALTER TABLE `scores` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table students
# ------------------------------------------------------------

DROP TABLE IF EXISTS `students`;

CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `stuNo` varchar(255) DEFAULT NULL,
  `clzz` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;

INSERT INTO `students` (`id`, `username`, `pwd`, `stuNo`, `clzz`, `created_at`, `updatedAt`)
VALUES
	(1,'aaa123','123','20240101','计算机软件1班','2024-04-10 10:08:39','2024-04-10 10:08:39'),
	(3,'bbb','123','20240102','计算机软件1班','2024-04-10 10:11:01','2024-04-10 10:11:01');

/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table subjects
# ------------------------------------------------------------

DROP TABLE IF EXISTS `subjects`;

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `subjectCode` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;

INSERT INTO `subjects` (`id`, `title`, `subjectCode`, `created_at`, `updatedAt`)
VALUES
	(1,'计算机基础','1000','2024-04-10 10:21:18','2024-04-10 10:21:18'),
	(3,'大学英语','1001','2024-04-10 10:21:42','2024-04-10 10:21:42');

/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
