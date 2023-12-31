-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 31, 2023 at 06:40 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `homesys`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Phone` varchar(50) NOT NULL,
  `Date` date NOT NULL,
  `Type` varchar(100) NOT NULL,
  `Status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `class_timetable`
--

CREATE TABLE `class_timetable` (
  `id` int(11) NOT NULL,
  `Start` varchar(100) NOT NULL,
  `SPeriod` varchar(50) NOT NULL,
  `End` varchar(100) NOT NULL,
  `EPeriod` varchar(50) NOT NULL,
  `Mon` varchar(100) NOT NULL,
  `Tue` varchar(100) NOT NULL,
  `Wed` varchar(100) NOT NULL,
  `Thur` varchar(100) NOT NULL,
  `Fri` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class_timetable`
--

INSERT INTO `class_timetable` (`id`, `Start`, `SPeriod`, `End`, `EPeriod`, `Mon`, `Tue`, `Wed`, `Thur`, `Fri`) VALUES
(1, '08:00', 'AM', '10:00', 'AM', 'NONE', 'CA2', 'SAD', 'VB', 'NONE'),
(2, '10:15', 'AM', '12:15', 'PM', 'VB', 'OOP', 'CA2', 'QM', 'NONE'),
(3, '01:15', 'PM', '03:15', 'PM', 'NONE', 'QM', 'DBMS', 'DBMS', 'NONE'),
(4, '03:30', 'PM', '05:30', 'PM', 'SAD', 'NONE', 'OOP', 'NONE', 'NONE');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Phone` varchar(100) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Type` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `Name`, `Address`, `Phone`, `Email`, `Type`) VALUES
(1, 'Gobe chaje', 'Kiamaiko, Nairobi', '0799333217', 'gobechaje@gmail.com', 'Family'),
(2, 'Testing', 'Testing', '0799866545', 'tester@gmail.com', 'Work'),
(9, ' ', ' ', ' ', ' ', ' ');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Venue` varchar(255) NOT NULL,
  `Date` date NOT NULL,
  `Contact` varchar(255) NOT NULL,
  `Type` varchar(100) NOT NULL,
  `Status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `Name`, `Venue`, `Date`, `Contact`, `Type`, `Status`) VALUES
(1, 'January Hackathon', 'KICC, Nairobi', '2024-01-05', 'info@testers.co.ke', 'Personal', 'Pending'),
(2, 'Close Party', 'Huruma, Kiamaiko', '2023-12-15', '0712345678', 'Work', 'Done');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `psk` varchar(255) CHARACTER SET cp1251 COLLATE cp1251_general_cs NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `username`, `psk`) VALUES
(1, 'admin', '$2y$10$od8UQnzJtBmgL0CPuSwDW.pqYy6GSMdyY6dB0Ut0xKPQZ3Zyb5iNS');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `Trans. Code` varchar(255) NOT NULL,
  `Acc. No.` varchar(255) NOT NULL,
  `Acc. Name` varchar(255) NOT NULL,
  `Amount` varchar(255) NOT NULL,
  `Date` date NOT NULL,
  `Type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `Trans. Code`, `Acc. No.`, `Acc. Name`, `Amount`, `Date`, `Type`) VALUES
(2, 'RYP234EWDW', '0710479129', 'SUZUKI', '10000', '2023-12-16', 'Sent'),
(4, 'HYTS12SAD', 'RIUY-213', 'RIKA PIZZA', '20000', '2023-12-12', 'Received');

-- --------------------------------------------------------

--
-- Table structure for table `personal_timetable`
--

CREATE TABLE `personal_timetable` (
  `id` int(11) NOT NULL,
  `Start` varchar(100) NOT NULL,
  `SPeriod` varchar(50) NOT NULL,
  `End` varchar(100) NOT NULL,
  `EPeriod` varchar(50) NOT NULL,
  `Mon` varchar(100) NOT NULL,
  `Tue` varchar(100) NOT NULL,
  `Wed` varchar(100) NOT NULL,
  `Thur` varchar(100) NOT NULL,
  `Fri` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `personal_timetable`
--

INSERT INTO `personal_timetable` (`id`, `Start`, `SPeriod`, `End`, `EPeriod`, `Mon`, `Tue`, `Wed`, `Thur`, `Fri`) VALUES
(1, '07:30', 'PM', '08:00', 'PM', 'VB', 'OOP', 'DBMS', 'SAD', 'CA2'),
(2, '08:00', 'PM', '08:20', 'PM', 'S', 'W', 'A', 'L', 'A'),
(3, '08:30', 'PM', '9:00', 'PM', 'SAD', 'CA2', 'QM', 'VB', 'DBMS'),
(17, '09:00', 'PM', '09:30', 'PM', 'ASSIGNO', 'ASSIGNO', 'ASSIGNO', 'ASSIGNO', 'ASSIGNO');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Type` varchar(255) NOT NULL,
  `Date Started` date NOT NULL,
  `Status` varchar(255) NOT NULL,
  `Link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `Title`, `Description`, `Type`, `Date Started`, `Status`, `Link`) VALUES
(1, 'Delightsome CBO', 'Developed a responsive, appealing website using HTML, CSS & Js', 'Client', '2020-10-10', 'Completed', 'https://delightsome.org'),
(2, 'Personal Portfolio', 'My Personal Portfolio Dev using HTML, CSS & Js', 'Personal', '2023-01-10', 'Completed', 'https://jumanjigobez.github.io/personal_portfolio'),
(42, ' ', ' ', ' ', '0000-00-00', ' ', ' ');

-- --------------------------------------------------------

--
-- Table structure for table `todo`
--

CREATE TABLE `todo` (
  `id` int(11) NOT NULL,
  `Task` varchar(255) NOT NULL,
  `Status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `todo`
--

INSERT INTO `todo` (`id`, `Task`, `Status`) VALUES
(83, 'add icons to the buttons and menus', 'Done');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class_timetable`
--
ALTER TABLE `class_timetable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_timetable`
--
ALTER TABLE `personal_timetable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `todo`
--
ALTER TABLE `todo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `class_timetable`
--
ALTER TABLE `class_timetable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `personal_timetable`
--
ALTER TABLE `personal_timetable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `todo`
--
ALTER TABLE `todo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
