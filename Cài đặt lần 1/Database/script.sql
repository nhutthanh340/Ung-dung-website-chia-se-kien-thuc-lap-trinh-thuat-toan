-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: chiase
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `baidang`
--

DROP TABLE IF EXISTS `baidang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `baidang` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idbaiviet` int(10) unsigned NOT NULL,
  `ngaydang` date NOT NULL,
  `idluotthich` int(10) unsigned NOT NULL,
  `idluotbinhluan` int(10) unsigned NOT NULL,
  `idluotchiase` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_baidang_baiviet` (`idbaiviet`),
  CONSTRAINT `fk_baidang_baiviet` FOREIGN KEY (`idbaiviet`) REFERENCES `baiviet` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baidang`
--

LOCK TABLES `baidang` WRITE;
/*!40000 ALTER TABLE `baidang` DISABLE KEYS */;
INSERT INTO `baidang` VALUES (1,1,'2019-02-02',1,1,1),(2,2,'2019-03-12',1,1,1);
/*!40000 ALTER TABLE `baidang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baiviet`
--

DROP TABLE IF EXISTS `baiviet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `baiviet` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tenbaiviet` text NOT NULL,
  `idtheloaibaiviet` int(10) unsigned NOT NULL,
  `noidung` text NOT NULL,
  `idnguoigui` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_baiviet_nguoidung` (`idnguoigui`),
  KEY `fk_baiviet_theloaibaiviet` (`idtheloaibaiviet`),
  CONSTRAINT `fk_baiviet_nguoidung` FOREIGN KEY (`idnguoigui`) REFERENCES `nguoidung` (`id`),
  CONSTRAINT `fk_baiviet_theloaibaiviet` FOREIGN KEY (`idtheloaibaiviet`) REFERENCES `theloaibaiviet` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baiviet`
--

LOCK TABLES `baiviet` WRITE;
/*!40000 ALTER TABLE `baiviet` DISABLE KEYS */;
INSERT INTO `baiviet` VALUES (1,'abc',2,'abc',1),(2,'abcd',1,'abcdef',1),(3,'abcdopo',3,'abcde',1);
/*!40000 ALTER TABLE `baiviet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `binhluan`
--

DROP TABLE IF EXISTS `binhluan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `binhluan` (
  `idnguoidung` int(10) unsigned NOT NULL,
  `idbaidang` int(10) unsigned NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `noidung` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_binhluan_idnguoidung` (`idnguoidung`),
  KEY `fk_binhluan_baidang` (`idbaidang`),
  KEY `_2` (`idnguoidung`,`idbaidang`),
  CONSTRAINT `fk_binhluan_baidang` FOREIGN KEY (`idbaidang`) REFERENCES `baidang` (`id`),
  CONSTRAINT `fk_binhluan_nguoidung` FOREIGN KEY (`idnguoidung`) REFERENCES `nguoidung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `binhluan`
--

LOCK TABLES `binhluan` WRITE;
/*!40000 ALTER TABLE `binhluan` DISABLE KEYS */;
INSERT INTO `binhluan` VALUES (1,1,1,'Hay qua');
/*!40000 ALTER TABLE `binhluan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chiase`
--

DROP TABLE IF EXISTS `chiase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `chiase` (
  `idnguoidung` int(10) unsigned NOT NULL,
  `idbaidang` int(10) unsigned NOT NULL,
  `soluong` int(11) DEFAULT NULL,
  PRIMARY KEY (`idnguoidung`,`idbaidang`),
  KEY `fk_chiase_baidang` (`idbaidang`),
  CONSTRAINT `fk_chiase_baidang` FOREIGN KEY (`idbaidang`) REFERENCES `baidang` (`id`),
  CONSTRAINT `fk_chiase_nguoidung` FOREIGN KEY (`idnguoidung`) REFERENCES `nguoidung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chiase`
--

LOCK TABLES `chiase` WRITE;
/*!40000 ALTER TABLE `chiase` DISABLE KEYS */;
INSERT INTO `chiase` VALUES (1,1,1),(1,2,1);
/*!40000 ALTER TABLE `chiase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loainguoidung`
--

DROP TABLE IF EXISTS `loainguoidung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `loainguoidung` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tenloai` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loainguoidung`
--

LOCK TABLES `loainguoidung` WRITE;
/*!40000 ALTER TABLE `loainguoidung` DISABLE KEYS */;
INSERT INTO `loainguoidung` VALUES (1,'Thành viên'),(2,'Admin');
/*!40000 ALTER TABLE `loainguoidung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `luotthich`
--

DROP TABLE IF EXISTS `luotthich`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `luotthich` (
  `idnguoidung` int(10) unsigned NOT NULL,
  `idbaidang` int(10) unsigned NOT NULL,
  `soluong` int(11) DEFAULT NULL,
  PRIMARY KEY (`idnguoidung`,`idbaidang`),
  KEY `fk_luotthich_baidang` (`idbaidang`),
  CONSTRAINT `fk_luotthich_baidang` FOREIGN KEY (`idbaidang`) REFERENCES `baidang` (`id`),
  CONSTRAINT `fk_luotthich_nguoidung` FOREIGN KEY (`idnguoidung`) REFERENCES `nguoidung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `luotthich`
--

LOCK TABLES `luotthich` WRITE;
/*!40000 ALTER TABLE `luotthich` DISABLE KEYS */;
INSERT INTO `luotthich` VALUES (1,1,1),(1,2,1);
/*!40000 ALTER TABLE `luotthich` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoidung`
--

DROP TABLE IF EXISTS `nguoidung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `nguoidung` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `hoten` text NOT NULL,
  `tendangnhap` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `trinhdohocvan` varchar(10) DEFAULT NULL,
  `matkhau` varchar(25) NOT NULL,
  `ngaysinh` date DEFAULT NULL,
  `idloainguoidung` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_nguoidung_loainguoidung` (`idloainguoidung`),
  CONSTRAINT `fk_nguoidung_loainguoidung` FOREIGN KEY (`idloainguoidung`) REFERENCES `loainguoidung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoidung`
--

LOCK TABLES `nguoidung` WRITE;
/*!40000 ALTER TABLE `nguoidung` DISABLE KEYS */;
INSERT INTO `nguoidung` VALUES (1,'Lương Ngọc Vũ','luongngocvu','lnv@gmail.com','Đại học','pass','1998-08-16',1),(2,'Phạm nhựt Thanh','phamnhutthanh','pnt@gmail.com','Đại học','pass','1998-12-12',2);
/*!40000 ALTER TABLE `nguoidung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theloaibaiviet`
--

DROP TABLE IF EXISTS `theloaibaiviet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `theloaibaiviet` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tentheloai` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theloaibaiviet`
--

LOCK TABLES `theloaibaiviet` WRITE;
/*!40000 ALTER TABLE `theloaibaiviet` DISABLE KEYS */;
INSERT INTO `theloaibaiviet` VALUES (1,'Ngôn ngữ lập trình'),(2,'Lập trình hướng đối tượng'),(3,'Trí tuệ nhân tạo'),(4,'Lập trình website'),(5,'Lập trình Android');
/*!40000 ALTER TABLE `theloaibaiviet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-31 14:40:47
