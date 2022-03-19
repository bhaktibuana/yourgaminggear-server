CREATE DATABASE  IF NOT EXISTS `yourgaminggear` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `yourgaminggear`;
-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: yourgaminggear
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'keyboard'),(2,'mouse'),(3,'chair'),(4,'mousepad'),(5,'headset');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Steelseries Arctis 7 (Wireless)',5,2899000,'/product_img/steelseries_arctis_7_wireless-1647184272.png','2022-03-19 05:51:58','2022-03-19 05:51:58',0),(2,'Steelseries Rival 5 (Wired)',5,999000,'/product_img/steelseries_rival_5-1647184268.png','2022-03-19 05:51:58','2022-03-19 05:51:58',0),(3,'Steelseries Apex Pro (Full Size)',4,2999000,'/product_img/steelseries_apex_pro_full-1647184270.png','2022-03-19 05:51:58','2022-03-19 05:51:58',0),(4,'Steelseries Rival 600 (Wired)',3,1299000,'/product_img/steelseries_rival_600-1647184269.png','2022-03-19 05:51:58','2022-03-19 05:51:58',0),(5,'Steelseries Apex Pro (TKL)',4,2699000,'/product_img/steelseries_apex_pro_tkl-1647184271.png','2022-03-19 05:51:58','2022-03-19 05:51:58',0),(6,'Steelseries Arctis 3 (Wired)',3,1199000,'/product_img/steelseries_arctis_3_wired-1647184273.png','2022-03-19 05:51:58','2022-03-19 05:51:58',0),(7,'Steelseries Arctis Pro (Wired)',4,2899000,'/product_img/steelseries_arctis_pro_wired-1647184274.png','2022-03-19 05:51:58','2022-03-19 05:51:58',0),(8,'Steelseries Arctis 5 (Wired)',4,1399000,'/product_img/steelseries_arctis_5_wired-1647184275.png','2022-03-19 05:51:58','2022-03-19 05:51:58',0),(9,'Steelseries QCK Prism Cloth (XL)',5,799000,'/product_img/steelseries_qck_prism_cloth_xl-1647184276.png','2022-03-19 05:51:58','2022-03-19 05:51:58',0),(10,'Steelseries QCK Prism NEO Noir Edition (XL)',3,899000,'/product_img/steelseries_qck_prism_neo_noir_xl-1647184277.png','2022-03-19 05:51:58','2022-03-19 05:51:58',0),(11,'Secretlab TITAN Evo 2022 NEO Hybrid',7,7399000,'/product_img/secret_lab_titan_evo_2022_neo_hybrid-1647184278.png','2022-03-19 05:51:58','2022-03-19 05:51:58',0),(12,'Secretlab TITAN Evo 2022 Dark Knight',4,7699000,'/product_img/secret_lab_titan_evo_2022_dark_knight-1647184279.png','2022-03-19 05:51:58','2022-03-19 05:51:58',0);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `product_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`product_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `product_category_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `product_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (3,1),(5,1),(2,2),(4,2),(11,3),(12,3),(9,4),(10,4),(1,5),(6,5),(7,5),(8,5);
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `join_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Admin','admin@example.com','ac9689e2272427085e35b9d3e3e8bed88cb3434828b43b86fc0596cad4c6e270','Admin Street Number 72 (61111)','081239741689','/profile_img/profile_default-1647184267.png','2022-03-19 05:51:58','2022-03-19 05:51:58',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-19 15:25:47
