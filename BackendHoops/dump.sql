-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: hoopshub
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `match`
--

DROP TABLE IF EXISTS `match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `home_team_id` int NOT NULL,
  `away_team_id` int NOT NULL,
  `venue_id` int NOT NULL,
  `home_team_score` int NOT NULL,
  `away_team_score` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match`
--

LOCK TABLES `match` WRITE;
/*!40000 ALTER TABLE `match` DISABLE KEYS */;
INSERT INTO `match` VALUES (1,'2024-10-26',1,2,1,100,90),(2,'2024-10-28',3,4,2,128,104),(3,'2024-10-28',5,6,3,115,102),(4,'2024-10-28',7,8,4,125,103),(5,'2024-10-27',9,10,5,105,114),(6,'2024-10-27',11,12,6,131,127),(7,'2024-10-27',13,14,7,114,102),(8,'2024-10-27',15,16,8,109,106),(9,'2024-10-27',17,18,9,95,114),(11,'2024-10-27',21,22,11,112,101),(12,'2024-10-27',23,24,12,106,114),(13,'2024-10-27',25,26,13,118,124),(14,'2024-10-27',27,28,14,116,135),(15,'2024-10-27',29,30,15,104,109),(16,'2024-10-27',29,30,15,104,109),(17,'2024-10-28',5,10,5,122,123),(18,'2024-10-28',5,10,5,122,123),(19,'2024-10-28',5,10,5,122,123),(22,'2024-10-28',5,10,5,122,123),(23,'2024-10-28',5,10,5,122,123),(24,'2024-10-28',5,10,5,122,123);
/*!40000 ALTER TABLE `match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `position` varchar(50) NOT NULL,
  `height` float NOT NULL,
  `weight` float NOT NULL,
  `team_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `team_id` (`team_id`),
  CONSTRAINT `player_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (1,'Domantas Sabonis','Centras',208,107,1),(2,'Domantas Sabonis','Center',208,108,1),(3,'Jayson Tatum','Small Forward',203,95,2),(4,'Dennis Schroder','Point guard',185,78,3),(5,'LaMelo Ball','Point guard',201,82,4),(6,'Matas Buzelis','Power forward',208,95,5),(7,'Donovan Mitchell','Shooting guard',191,98,6),(8,'Luka Doncic','Shooting guard',201,104,7),(9,'Nikola Jokic','Center',211,129,8),(10,'Cade Cunningham','Point Guard',201,99,9),(11,'Stephen Curry','Point Guard',188,84,10),(12,'Jalen Green','Shooting Guard',193,88,11),(13,'Tyrese Haliburton','Point Guard',196,84,12),(14,'LeBron James','Forward',206,113,13),(15,'Kawhi Leonard','Forward',201,102,14),(16,'Ja Morant','Point Guard',188,79,15),(17,'Jimmy Butler','Small Forward',201,104,16),(18,'Giannis Antetokounmpo','Forward',211,110,17),(19,'Anthony Edwards','Shooting Guard',193,102,18),(20,'Zion Williamson','Forward',198,129,19),(21,'Julius Randle','Power Forward',203,113,20),(22,'Shai Gilgeous-Alexander','Guard',198,91,NULL),(23,'Paolo Banchero','Forward',208,113,22),(24,'Joel Embiid','Center',213,127,23),(26,'Damian Lillard','Point Guard',188,88,25),(27,'Victor Wembanyama','Center',224,95,27),(28,'Pascal Siakam','Power Forward',206,104,28),(29,'Lauri Markkanen','Forward',213,109,29),(31,'Bradley Beal','Shooting Guard',193,94,30),(32,'Edmundas Kucinskas','Centras',188,88,12),(33,'Edmundas Kucinskas','Centras',188,88,12),(34,'Edmundas Kucinskas','Centras',188,88,12),(37,'Edmundas Kucinskas','Centras',188,88,12),(38,'Edmundas Kucinskas','Centras',188,88,12),(39,'Edmundas Kucinskas','Centras',188,88,12),(40,'<1>','<2>',0,0,NULL);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (3,'administrator'),(1,'guest'),(2,'member');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,'Sacramento Kings','Sacramento'),(2,'Atlanta Hawks','Atlanta'),(3,'Boston Celtics','Boston'),(4,'Charlotte Hornets','Charlotte'),(5,'Chicago Bulls','Chicago'),(6,'Cleveland Cavaliers','Cleveland'),(7,'Dallas Mavericks','Dallas'),(8,'Denver Nuggets','Denver'),(9,'Detroit Pistons','Detroit'),(10,'Golden State Warriors','San Francisco'),(11,'Houston Rockets','Houston'),(12,'Indiana Pacers','Indianapolis'),(13,'Los Angeles Clippers','Los Angeles'),(14,'Los Angeles Lakers','Los Angeles'),(15,'Memphis Grizzlies','Memphis'),(16,'Miami Heat','Miami'),(17,'Milwaukee Bucks','Milwaukee'),(18,'Minnesota Timberwolves','Minneapolis'),(19,'New Orleans Pelicans','New Orleans'),(20,'New York Knicks','New York'),(22,'Orlando Magic','Orlando'),(23,'Philadelphia 76ers','Philadelphia'),(24,'Phoenix Suns','Phoenix'),(25,'Portland Trail Blazers','Portland'),(27,'San Antonio Spurs','San Antonio'),(28,'Toronto Raptors','Toronto'),(29,'Utah Jazz','Salt Lake City'),(30,'Washington Wizards','Washington D.C.'),(33,'Neptunas','Vilnius'),(34,'Kauno Zalgiris','Kaunas'),(35,'Kauno Zalgiris','Kaunas'),(36,'0','<string>'),(37,'Kauno Zalgiris','Kaunas'),(38,'Kauno Zalgiris','Kaunas'),(39,'Kauno Zalgiris','Kaunas'),(42,'<string>','<string>'),(43,'<string>','<string>'),(44,'<1>','<2>');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(80) NOT NULL,
  `password_hash` varchar(128) NOT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','$2b$12$dJ0hdVwD3MNy8.c0ggZP.eGcdfseQWz3qJoyQ.jQlEKw2Zo9OujlW',3),(7,'user1','$2b$12$f1kkHUZyZHYUeJavUsmnAeyPA8Ct6r481gRmVcPV44OHfB7bgYW0u',2),(8,'user2','$2b$12$wRzL9fimjt5En2vxy6YEoO5RUVErTcUvAAJpJS.C6.NlFNn6pXmOy',2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venue`
--

DROP TABLE IF EXISTS `venue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venue` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `capacity` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venue`
--

LOCK TABLES `venue` WRITE;
/*!40000 ALTER TABLE `venue` DISABLE KEYS */;
INSERT INTO `venue` VALUES (1,'Atlanta arena','Atlanta',17000),(2,'TD Garden','Boston, MA',19456),(3,'Barclays Center','Brooklyn, NY',17732),(4,'Spectrum Center','Charlotte, NC',19077),(5,'United Center','Chicago, IL',20917),(6,'Rocket Mortgage FieldHouse','Cleveland, OH',19432),(7,'American Airlines Center','Dallas, TX',19200),(8,'Ball Arena','Denver, CO',19520),(9,'Little Caesars Arena','Detroit, MI',20491),(10,'Chase Center','San Francisco, CA',18064),(11,'Toyota Center','Houston, TX',18055),(12,'Gainbridge Fieldhouse','Indianapolis, IN',17923),(13,'Crypto.com Arena','Los Angeles, CA',19068),(14,'FedExForum','Memphis, TN',18119),(15,'Kaseya Center','Miami, FL',19600),(16,'Fiserv Forum','Milwaukee, WI',17500),(17,'Target Center','Minneapolis, MN',19356),(18,'Smoothie King Center','New Orleans, LA',16867),(19,'Madison Square Garden','New York, NY',19812),(20,'Paycom Center','Oklahoma City, OK',18203),(21,'Amway Center','Orlando, FL',18846),(22,'Wells Fargo Center','Philadelphia, PA',20478),(23,'Footprint Center','Phoenix, AZ',18055),(24,'Moda Center','Portland, OR',19393),(26,'AT&T Center','San Antonio, TX',18418),(27,'Scotiabank Arena','Toronto, ON',19800),(28,'Delta Center','Salt Lake City, UT',18306),(29,'Capital One Arena','Washington, D.C.',20476),(30,'Capital One Arena','Washington, D.C.',20476),(31,'Svyturio arena','Klaipeda',7500),(32,'Svyturio arena','Klaipeda',7500),(33,'Svyturio arena','Klaipeda',7500),(34,'Svyturio arena','Klaipeda',7500),(35,'Svyturio arena','Klaipeda',7500),(36,'Svyturio arena','Klaipeda',7500),(37,'Svyturio arena','Klaipeda',7500),(38,'Svyturio arena','Klaipeda',7500),(39,'Svyturio arena','Klaipeda',7500),(40,'Svyturio arena','Klaipeda',7500),(41,'Svyturio arena','Klaipeda',7500),(42,'Svyturio arena','Klaipeda',7500),(43,'Svyturio arena','Klaipeda',7500),(44,'Svyturio arena','Klaipeda',7500),(45,'Svyturio arena','Klaipeda',7500),(46,'Svyturio arena','Klaipeda',7500),(47,'Svyturio arena','Klaipeda',7500),(48,'Svyturio arena','Klaipeda',7500),(50,'Svyturio arena','Klaipeda',7500),(51,'Svyturio arena','Klaipeda',7500),(52,'Svyturio arena','Klaipeda',7500);
/*!40000 ALTER TABLE `venue` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-15 23:45:43
