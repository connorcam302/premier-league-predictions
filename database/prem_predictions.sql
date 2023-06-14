-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 14, 2023 at 10:34 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prem_predictions`
--

-- --------------------------------------------------------

--
-- Table structure for table `predictions`
--

CREATE TABLE `predictions` (
  `predictionid` int(99) NOT NULL,
  `userid` int(99) NOT NULL,
  `prediction` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`prediction`)),
  `season` bigint(99) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `predictions`
--

INSERT INTO `predictions` (`predictionid`, `userid`, `prediction`, `season`) VALUES
(5, 7, '[{\"teamid\":13,\"position\":1},{\"teamid\":12,\"position\":2},{\"teamid\":6,\"position\":3},{\"teamid\":18,\"position\":4},{\"teamid\":2,\"position\":5},{\"teamid\":15,\"position\":6},{\"teamid\":14,\"position\":7},{\"teamid\":19,\"position\":8},{\"teamid\":7,\"position\":9},{\"teamid\":20,\"position\":10},{\"teamid\":11,\"position\":11},{\"teamid\":3,\"position\":12},{\"teamid\":4,\"position\":13},{\"teamid\":5,\"position\":14},{\"teamid\":17,\"position\":15},{\"teamid\":16,\"position\":16},{\"teamid\":10,\"position\":17},{\"teamid\":8,\"position\":18},{\"teamid\":9,\"position\":19},{\"teamid\":1,\"position\":20}]', 2022),
(6, 9, '[{\"teamid\":13,\"position\":1},{\"teamid\":12,\"position\":2},{\"teamid\":18,\"position\":3},{\"teamid\":2,\"position\":20},{\"teamid\":14,\"position\":5},{\"teamid\":6,\"position\":6},{\"teamid\":19,\"position\":7},{\"teamid\":15,\"position\":8},{\"teamid\":11,\"position\":9},{\"teamid\":3,\"position\":10},{\"teamid\":20,\"position\":11},{\"teamid\":5,\"position\":12},{\"teamid\":7,\"position\":13},{\"teamid\":10,\"position\":14},{\"teamid\":16,\"position\":15},{\"teamid\":17,\"position\":16},{\"teamid\":9,\"position\":17},{\"teamid\":8,\"position\":18},{\"teamid\":4,\"position\":19},{\"teamid\":1,\"position\":4}]', 2022),
(8, 10, '[{\"teamid\":12,\"position\":1},{\"teamid\":13,\"position\":2},{\"teamid\":6,\"position\":3},{\"teamid\":2,\"position\":4},{\"teamid\":14,\"position\":5},{\"teamid\":18,\"position\":6},{\"teamid\":19,\"position\":7},{\"teamid\":15,\"position\":8},{\"teamid\":11,\"position\":9},{\"teamid\":7,\"position\":10},{\"teamid\":3,\"position\":11},{\"teamid\":10,\"position\":12},{\"teamid\":8,\"position\":13},{\"teamid\":16,\"position\":14},{\"teamid\":5,\"position\":15},{\"teamid\":4,\"position\":16},{\"teamid\":20,\"position\":17},{\"teamid\":9,\"position\":18},{\"teamid\":17,\"position\":19},{\"teamid\":1,\"position\":20}]', 2022),
(9, 11, '[{\"teamid\":12,\"position\":1},{\"teamid\":13,\"position\":2},{\"teamid\":2,\"position\":3},{\"teamid\":6,\"position\":4},{\"teamid\":18,\"position\":5},{\"teamid\":14,\"position\":6},{\"teamid\":19,\"position\":7},{\"teamid\":15,\"position\":8},{\"teamid\":20,\"position\":9},{\"teamid\":3,\"position\":10},{\"teamid\":11,\"position\":11},{\"teamid\":5,\"position\":12},{\"teamid\":7,\"position\":13},{\"teamid\":4,\"position\":14},{\"teamid\":8,\"position\":15},{\"teamid\":10,\"position\":16},{\"teamid\":17,\"position\":17},{\"teamid\":16,\"position\":18},{\"teamid\":1,\"position\":19},{\"teamid\":9,\"position\":20}]', 2022),
(10, 12, '[{\"teamid\":13,\"position\":1},{\"teamid\":12,\"position\":2},{\"teamid\":18,\"position\":3},{\"teamid\":2,\"position\":4},{\"teamid\":6,\"position\":5},{\"teamid\":15,\"position\":6},{\"teamid\":19,\"position\":7},{\"teamid\":14,\"position\":8},{\"teamid\":10,\"position\":9},{\"teamid\":7,\"position\":10},{\"teamid\":3,\"position\":11},{\"teamid\":11,\"position\":12},{\"teamid\":4,\"position\":13},{\"teamid\":16,\"position\":14},{\"teamid\":5,\"position\":15},{\"teamid\":20,\"position\":16},{\"teamid\":17,\"position\":17},{\"teamid\":9,\"position\":18},{\"teamid\":8,\"position\":19},{\"teamid\":1,\"position\":20}]', 2022),
(11, 13, '[{\"teamid\":13,\"position\":1},{\"teamid\":12,\"position\":2},{\"teamid\":18,\"position\":3},{\"teamid\":6,\"position\":4},{\"teamid\":2,\"position\":5},{\"teamid\":14,\"position\":6},{\"teamid\":19,\"position\":7},{\"teamid\":5,\"position\":8},{\"teamid\":15,\"position\":9},{\"teamid\":7,\"position\":10},{\"teamid\":20,\"position\":11},{\"teamid\":11,\"position\":12},{\"teamid\":3,\"position\":13},{\"teamid\":8,\"position\":14},{\"teamid\":4,\"position\":15},{\"teamid\":10,\"position\":16},{\"teamid\":16,\"position\":17},{\"teamid\":17,\"position\":18},{\"teamid\":9,\"position\":19},{\"teamid\":1,\"position\":20}]', 2022),
(12, 14, '[{\"teamid\":13,\"position\":1},{\"teamid\":12,\"position\":2},{\"teamid\":18,\"position\":3},{\"teamid\":2,\"position\":4},{\"teamid\":6,\"position\":5},{\"teamid\":14,\"position\":6},{\"teamid\":19,\"position\":7},{\"teamid\":15,\"position\":8},{\"teamid\":11,\"position\":9},{\"teamid\":7,\"position\":10},{\"teamid\":3,\"position\":11},{\"teamid\":5,\"position\":12},{\"teamid\":20,\"position\":13},{\"teamid\":8,\"position\":14},{\"teamid\":10,\"position\":15},{\"teamid\":4,\"position\":16},{\"teamid\":16,\"position\":17},{\"teamid\":17,\"position\":18},{\"teamid\":9,\"position\":19},{\"teamid\":1,\"position\":20}]', 2022),
(13, 15, '[{\"teamid\":13,\"position\":1},{\"teamid\":12,\"position\":2},{\"teamid\":18,\"position\":3},{\"teamid\":2,\"position\":4},{\"teamid\":6,\"position\":5},{\"teamid\":15,\"position\":6},{\"teamid\":19,\"position\":7},{\"teamid\":14,\"position\":8},{\"teamid\":11,\"position\":9},{\"teamid\":7,\"position\":10},{\"teamid\":5,\"position\":11},{\"teamid\":3,\"position\":12},{\"teamid\":4,\"position\":13},{\"teamid\":20,\"position\":14},{\"teamid\":10,\"position\":15},{\"teamid\":8,\"position\":16},{\"teamid\":9,\"position\":17},{\"teamid\":16,\"position\":18},{\"teamid\":17,\"position\":19},{\"teamid\":1,\"position\":20}]', 2022),
(14, 16, '[{\"teamid\":18,\"position\":1},{\"teamid\":13,\"position\":2},{\"teamid\":6,\"position\":3},{\"teamid\":12,\"position\":4},{\"teamid\":14,\"position\":5},{\"teamid\":2,\"position\":6},{\"teamid\":19,\"position\":7},{\"teamid\":3,\"position\":8},{\"teamid\":11,\"position\":9},{\"teamid\":4,\"position\":10},{\"teamid\":7,\"position\":11},{\"teamid\":15,\"position\":12},{\"teamid\":5,\"position\":13},{\"teamid\":17,\"position\":14},{\"teamid\":8,\"position\":15},{\"teamid\":20,\"position\":16},{\"teamid\":1,\"position\":17},{\"teamid\":16,\"position\":18},{\"teamid\":10,\"position\":19},{\"teamid\":9,\"position\":20}]', 2022),
(15, 8, '[{\"teamid\":12,\"position\":1},{\"teamid\":13,\"position\":2},{\"teamid\":2,\"position\":3},{\"teamid\":14,\"position\":4},{\"teamid\":15,\"position\":5},{\"teamid\":6,\"position\":6},{\"teamid\":18,\"position\":7},{\"teamid\":3,\"position\":8},{\"teamid\":4,\"position\":9},{\"teamid\":9,\"position\":10},{\"teamid\":7,\"position\":11},{\"teamid\":5,\"position\":12},{\"teamid\":21,\"position\":13},{\"teamid\":8,\"position\":14},{\"teamid\":20,\"position\":15},{\"teamid\":19,\"position\":16},{\"teamid\":16,\"position\":17},{\"teamid\":22,\"position\":18},{\"teamid\":1,\"position\":19},{\"teamid\":23,\"position\":20}]', 2023),
(16, 7, '[{\"teamid\":13,\"position\":1},{\"teamid\":12,\"position\":2},{\"teamid\":2,\"position\":3},{\"teamid\":15,\"position\":4},{\"teamid\":14,\"position\":5},{\"teamid\":6,\"position\":6},{\"teamid\":3,\"position\":7},{\"teamid\":18,\"position\":8},{\"teamid\":5,\"position\":9},{\"teamid\":4,\"position\":10},{\"teamid\":20,\"position\":11},{\"teamid\":9,\"position\":12},{\"teamid\":19,\"position\":13},{\"teamid\":1,\"position\":14},{\"teamid\":21,\"position\":15},{\"teamid\":22,\"position\":16},{\"teamid\":7,\"position\":17},{\"teamid\":8,\"position\":18},{\"teamid\":16,\"position\":19},{\"teamid\":23,\"position\":20}]', 2023),
(18, 8, '[{\"teamid\":12,\"position\":1},{\"teamid\":13,\"position\":2},{\"teamid\":2,\"position\":3},{\"teamid\":14,\"position\":4},{\"teamid\":15,\"position\":5},{\"teamid\":6,\"position\":6},{\"teamid\":18,\"position\":7},{\"teamid\":3,\"position\":8},{\"teamid\":4,\"position\":9},{\"teamid\":9,\"position\":10},{\"teamid\":7,\"position\":11},{\"teamid\":5,\"position\":12},{\"teamid\":21,\"position\":13},{\"teamid\":8,\"position\":14},{\"teamid\":20,\"position\":15},{\"teamid\":19,\"position\":16},{\"teamid\":16,\"position\":17},{\"teamid\":22,\"position\":18},{\"teamid\":1,\"position\":19},{\"teamid\":23,\"position\":20}]', 2022),
(19, 17, '[{\"teamid\":13,\"position\":1},{\"teamid\":14,\"position\":2},{\"teamid\":15,\"position\":3},{\"teamid\":12,\"position\":4},{\"teamid\":2,\"position\":5},{\"teamid\":5,\"position\":6},{\"teamid\":3,\"position\":7},{\"teamid\":18,\"position\":8},{\"teamid\":4,\"position\":9},{\"teamid\":6,\"position\":10},{\"teamid\":9,\"position\":11},{\"teamid\":1,\"position\":12},{\"teamid\":7,\"position\":13},{\"teamid\":21,\"position\":14},{\"teamid\":20,\"position\":15},{\"teamid\":19,\"position\":16},{\"teamid\":16,\"position\":17},{\"teamid\":8,\"position\":18},{\"teamid\":23,\"position\":19},{\"teamid\":22,\"position\":20}]', 2023);

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `teamid` int(11) NOT NULL,
  `name` varchar(99) NOT NULL,
  `placement_2021` int(99) NOT NULL,
  `placement_2022` int(99) DEFAULT NULL,
  `placement_2023` int(99) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`teamid`, `name`, `placement_2021`, `placement_2022`, `placement_2023`) VALUES
(1, 'AFC Bournemouth', 21, 15, 15),
(2, 'Arsenal FC', 5, 2, 2),
(3, 'Aston Villa', 14, 7, 7),
(4, 'Brentford FC', 13, 9, 9),
(5, 'Brighton & Hove Albion', 9, 6, 6),
(6, 'Chelsea FC', 3, 12, 12),
(7, 'Crystal Palace', 12, 11, 11),
(8, 'Everton FC', 16, 17, 17),
(9, 'Fulham FC', 21, 10, 10),
(10, 'Leeds United', 17, 19, 21),
(11, 'Leicester City', 8, 18, 21),
(12, 'Liverpool FC', 2, 5, 5),
(13, 'Manchester City', 1, 1, 1),
(14, 'Manchester United', 6, 3, 3),
(15, 'Newcastle United', 11, 4, 4),
(16, 'Nottingham Forest', 21, 16, 16),
(17, 'Southampton FC', 15, 20, 21),
(18, 'Tottenham Hotspur', 4, 8, 8),
(19, 'West Ham United', 7, 14, 14),
(20, 'Wolverhampton Wanderers', 10, 13, 13),
(21, 'Burnley FC', 18, 21, 18),
(22, 'Sheffield United', 21, 21, 19),
(23, 'Luton Town', 21, 21, 20);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `username` varchar(999) NOT NULL,
  `password` varchar(999) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `username`, `password`) VALUES
(7, 'Connor', '$2y$10$Ll25wXJonvaivpOdJhhVY.0/uNCjcggnXCfE8KyNz8mfHXjWG0Tqe'),
(8, 'Tom', '$2y$10$WuIuV462gtpA2J.LRXVgNeOYulXZZoIv9j9puFil.f4hfw5.FCDYS'),
(9, 'Brock', '$2y$10$VBhrBsZhrQrqv6QbiAV8n.a5QSGf5kquiHUr0XhJWwILa5dHzKyFG'),
(10, 'Bingham', '$2y$10$8e08cPV5IHCO6KfI8JmwdeUueRu.3d5vy5ScSHpdVfL3o5sI00ru.'),
(11, 'Steve', '$2y$10$jsAtqmEN4jxkgXs/mMsDQOdbm6KyuHlMUx4wSKSL7E7gt.CLNKB8u'),
(12, 'Potto', '$2y$10$P76R1X3gynySJtTmJ6n/q.pXp8hzz7vEujULdGly4FxvP18ZTMCe.'),
(13, 'Liam', '$2y$10$rcC/Ygjn8eOdJNofDvV6VulY4O/y98lrZpTjahhPfKY81fPVPIUCO'),
(14, 'Callum', '$2y$10$NoV293HH0IXj83n9dO1GJeFdgSU77bjR1c1WiydE5qlyhLi6V4Jc2'),
(15, 'Evan', '$2y$10$iKWatAEmytq.w17XhkYR2eLh.FWMN62wALEYJNaFMu.X4aIgPY3S6'),
(16, 'Matthew', '$2y$10$Xebm/WJU62GwHAeMPD/IyO5ofHoYUDPLLQ3oNc2xMJZNjU6jdYfDq'),
(17, 'Harry', '$2y$10$WbD5Zjj73FeikCTwFDK0LuTS6zLnWr1ZKB8D7NwyfdjNMyHvq7IeG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `predictions`
--
ALTER TABLE `predictions`
  ADD PRIMARY KEY (`predictionid`),
  ADD KEY `userid-users` (`userid`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`teamid`);

--
-- Indexes for table `teams_2023`
--
ALTER TABLE `teams_2023`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `placement` (`placement`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `predictions`
--
ALTER TABLE `predictions`
  MODIFY `predictionid` int(99) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `teamid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `teams_2023`
--
ALTER TABLE `teams_2023`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `predictions`
--
ALTER TABLE `predictions`
  ADD CONSTRAINT `userid-users` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
