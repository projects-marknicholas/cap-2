-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2025 at 02:15 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `capstone2`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `course_id` varchar(255) NOT NULL,
  `program` varchar(255) NOT NULL,
  `curriculum_year` varchar(255) NOT NULL,
  `year_level` varchar(255) NOT NULL,
  `semester` varchar(255) NOT NULL,
  `course_code` varchar(255) NOT NULL,
  `course_description` varchar(255) NOT NULL,
  `course_type` varchar(255) NOT NULL,
  `units` varchar(255) NOT NULL,
  `hours` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `course_id`, `program`, `curriculum_year`, `year_level`, `semester`, `course_code`, `course_description`, `course_type`, `units`, `hours`, `created_at`) VALUES
(66, '9b7b93cf5c8ee28fb1ddc4d2d2a4151c', 'BSIT', '2024-2025', '1', '1', 'CCS 101', 'Subject 1', 'lec', '1', '1', '2025-03-10 23:40:17'),
(67, '402e417fb6bfad81e9c186cff968eb92', 'BSIT', '2024-2025', '1', '2', 'CCS 102', 'Subject 2', 'lab', '1', '3', '2025-03-10 23:40:29'),
(68, '9fd4b42c9992d6160cbbb31c555c03c6', 'BSIT', '2024-2025', '2', '1', 'CCS 103', 'Subject 3', 'lec', '1', '1', '2025-03-10 23:40:51'),
(69, '23a55ce0d64da98e66f82e6514ad2877', 'BSIT', '2024-2025', '2', '2', 'CCS 104', 'Subject 4', 'lab', '1', '3', '2025-03-10 23:41:17'),
(70, 'dfeefeb31c97f41503db94b3000861ff', 'BSIT', '2024-2025', '2', '1', 'CCS 105', 'Subject 5', 'lec', '1', '1', '2025-03-10 23:41:39'),
(71, 'a78d1ef8fca7e5c4353a1586c9a0a1d7', 'BSIT', '2024-2025', '2', 'summer', 'CCS 106', 'Subject 6', 'lab', '1', '3', '2025-03-11 06:26:12');

-- --------------------------------------------------------

--
-- Table structure for table `co_requisites`
--

CREATE TABLE `co_requisites` (
  `id` int(11) NOT NULL,
  `co_requisite_id` varchar(255) NOT NULL,
  `course_id` varchar(255) NOT NULL,
  `course_code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `co_requisites`
--

INSERT INTO `co_requisites` (`id`, `co_requisite_id`, `course_id`, `course_code`) VALUES
(5978127, '38028bac06b7f79e', '900f4b33691a97492425fe360981ac49', ''),
(5978128, 'a551bc3553293432', '34a4ad7109cf4bc0e8499d276a967bb4', 'CCS 101'),
(5978129, '641a45dde5dfbb0d', '9822aa3f65fe047e6d15fb14efc95509', 'CCS 101'),
(5978130, '641a45dde5dfbb0d', '9822aa3f65fe047e6d15fb14efc95509', 'CCS 102'),
(5978131, '641a45dde5dfbb0d', '9822aa3f65fe047e6d15fb14efc95509', 'CCS 103'),
(5978132, 'a34cd008673aef2d', '9b7b93cf5c8ee28fb1ddc4d2d2a4151c', ''),
(5978133, '6e805d25107a7870', '402e417fb6bfad81e9c186cff968eb92', ''),
(5978134, '7f6fc4ed8fc820e2', '9fd4b42c9992d6160cbbb31c555c03c6', 'CCS 102'),
(5978135, '5349a2efd0ba3b41', '23a55ce0d64da98e66f82e6514ad2877', 'CCS 103'),
(5978136, '5349a2efd0ba3b41', '23a55ce0d64da98e66f82e6514ad2877', 'CCS 102'),
(5978137, '05a47a70a724c642', 'dfeefeb31c97f41503db94b3000861ff', 'CCS 101'),
(5978138, 'e55ea35b7b04d2dd', 'a78d1ef8fca7e5c4353a1586c9a0a1d7', '');

-- --------------------------------------------------------

--
-- Table structure for table `curriculum`
--

CREATE TABLE `curriculum` (
  `id` int(11) NOT NULL,
  `curriculum_id` varchar(255) NOT NULL,
  `program` varchar(255) NOT NULL,
  `description` varchar(3000) DEFAULT NULL,
  `curriculum_year` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `curriculum`
--

INSERT INTO `curriculum` (`id`, `curriculum_id`, `program`, `description`, `curriculum_year`, `created_at`) VALUES
(6, '7466bdb07ed2f388febe1e718f0915df', 'BSIT', 'Bachelor of Science in Information Technology', '2024-2025', '2025-01-27 21:02:53'),
(7, 'ded74520077fe38889540c0bdd0a7274', 'BSITBPO', 'Bachelor of Science in Information Technology with BPO', '2021-2022', '2025-01-29 21:14:57'),
(11, '74d10462812a390231685352701c3d4d', 'BSITGD', 'Bachelor of Science in Information Technology with Specialization in Game Development', '2022-2023', '2025-02-13 10:54:52'),
(12, '87190ae70dea656e733bffc61df5e45e', 'BSIT', 'Bachelor of Science in Information Technology', '2025-2026', '2025-03-11 00:04:58');

-- --------------------------------------------------------

--
-- Table structure for table `enrollment`
--

CREATE TABLE `enrollment` (
  `id` int(11) NOT NULL,
  `assign_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `subject_id` varchar(255) NOT NULL,
  `credits` float NOT NULL,
  `is_enrolled` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollment`
--

INSERT INTO `enrollment` (`id`, `assign_id`, `user_id`, `subject_id`, `credits`, `is_enrolled`, `created_at`) VALUES
(49, '377a7f625c0fae4ff77535df6be91765', '66bf87d765323c17e68025afc4d91087', '7ceb340c867a0f46bf3762f36b579e8d', 0, 0, '2024-12-14 09:54:17'),
(50, '377a7f625c0fae4ff77535df6be91765', '66bf87d765323c17e68025afc4d91087', '469bd747515cd1009232617d37c682c7', 0, 0, '2024-12-14 09:54:17'),
(51, '377a7f625c0fae4ff77535df6be91765', '66bf87d765323c17e68025afc4d91087', '93ea5094c32b56668980621caa8f7fac', 0, 0, '2024-12-14 09:54:17'),
(52, '23270c5669735164171f32709a2cfb14', '66bf87d765323c17e68025afc4d91087', '618631f6cbe5a8960c542ee4bb0b40fa', 0, 0, '2024-09-14 10:01:59'),
(53, '23270c5669735164171f32709a2cfb14', '66bf87d765323c17e68025afc4d91087', 'b5900473edb5657f8a70bad9e3147a99', 0, 0, '2024-12-14 10:01:59'),
(54, '0303a88f2e521397f88ee74ec56cb0b6', '66bf87d765323c17e68025afc4d91087', '8e27f3bc1376ae1ce10234fa137f585c', 0, 0, '2024-12-14 10:08:55'),
(55, '0303a88f2e521397f88ee74ec56cb0b6', '66bf87d765323c17e68025afc4d91087', '2f99994bd216609f30865b433a6efa03', 1.25, 1, '2024-12-14 10:08:55'),
(56, '0303a88f2e521397f88ee74ec56cb0b6', '66bf87d765323c17e68025afc4d91087', '8fc986565527fa5548a7d3a1c0455584', 1.7, 1, '2024-12-14 10:08:55'),
(57, '3a03f2fd4c354499bcbb54db760e85b6', '66bf87d765323c17e68025afc4d91087', '589da18b2ab80d0c1a398f7e6adeaf0d', 0, 0, '2024-12-14 10:09:37'),
(58, 'b410a082c8e7dff63b3155e3d903299b', 'b3ac709d66004148cd1763a7e17fbbe0', '7ceb340c867a0f46bf3762f36b579e8d', 1.25, 1, '2024-12-14 18:17:49'),
(59, 'b410a082c8e7dff63b3155e3d903299b', 'b3ac709d66004148cd1763a7e17fbbe0', '93ea5094c32b56668980621caa8f7fac', 0, 0, '2024-12-14 18:17:49'),
(60, 'ac074680673a35060058581acce822c5', 'b3ac709d66004148cd1763a7e17fbbe0', '618631f6cbe5a8960c542ee4bb0b40fa', 0, 0, '2024-12-14 18:18:53'),
(61, 'ac074680673a35060058581acce822c5', 'b3ac709d66004148cd1763a7e17fbbe0', 'b5900473edb5657f8a70bad9e3147a99', 1.7, 1, '2024-12-14 18:18:53'),
(62, '995d0f329dcd3891f8e82a31fe65714e', 'b3ac709d66004148cd1763a7e17fbbe0', '469bd747515cd1009232617d37c682c7', 0, 1, '2024-12-14 18:20:11'),
(63, '15457189e074aba32a95b0da2a291811', '66bf87d765323c17e68025afc4d91087', '62645197b2d65700eb00291a82d6dbf1', 1.5, 1, '2024-12-16 04:01:43'),
(64, '15457189e074aba32a95b0da2a291811', '66bf87d765323c17e68025afc4d91087', '2111477130de8c6f3c1fa4b06bb3ca8e', 1.25, 1, '2024-12-16 04:01:43'),
(65, '09af62b8944563dcf608de481230255a', '6b717e4646c8efee55d4255178b1b9a2', '62645197b2d65700eb00291a82d6dbf1', 4, 1, '2024-12-16 04:02:45'),
(66, '09af62b8944563dcf608de481230255a', '6b717e4646c8efee55d4255178b1b9a2', '2111477130de8c6f3c1fa4b06bb3ca8e', 1.25, 1, '2024-12-16 04:02:45');

-- --------------------------------------------------------

--
-- Table structure for table `pre_requisites`
--

CREATE TABLE `pre_requisites` (
  `id` int(20) NOT NULL,
  `pre_requisite_id` varchar(255) NOT NULL,
  `course_id` varchar(255) NOT NULL,
  `course_code` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pre_requisites`
--

INSERT INTO `pre_requisites` (`id`, `pre_requisite_id`, `course_id`, `course_code`) VALUES
(21, 'ab344798698fa92a', '900f4b33691a97492425fe360981ac49', ''),
(22, '2cda70b983ea301c', '34a4ad7109cf4bc0e8499d276a967bb4', 'CCS 102'),
(23, '3ba43765f147daa6', '9822aa3f65fe047e6d15fb14efc95509', 'CCS 103'),
(24, '3ba43765f147daa6', '9822aa3f65fe047e6d15fb14efc95509', 'CCS 102'),
(25, '3ba43765f147daa6', '9822aa3f65fe047e6d15fb14efc95509', 'CCS 101'),
(26, '058a32b0fa15cae2', '9b7b93cf5c8ee28fb1ddc4d2d2a4151c', ''),
(27, '453fe0edf7f9f301', '402e417fb6bfad81e9c186cff968eb92', ''),
(28, 'c07fd763d19cc7ce', '9fd4b42c9992d6160cbbb31c555c03c6', 'CCS 102'),
(29, 'd162e0813459634b', '23a55ce0d64da98e66f82e6514ad2877', 'CCS 103'),
(30, 'd162e0813459634b', '23a55ce0d64da98e66f82e6514ad2877', 'CCS 102'),
(31, 'cd2a722d46f8c036', 'dfeefeb31c97f41503db94b3000861ff', 'CCS 101'),
(32, 'f8135297d923e9bf', 'a78d1ef8fca7e5c4353a1586c9a0a1d7', '');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `subject_id` varchar(255) NOT NULL,
  `subject_code` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `curriculum_name` varchar(255) DEFAULT NULL,
  `lec_unit` varchar(10) NOT NULL,
  `lab_unit` varchar(10) NOT NULL,
  `lec_hours` varchar(10) NOT NULL,
  `lab_hours` varchar(10) NOT NULL,
  `year_level` varchar(10) DEFAULT NULL,
  `year` varchar(10) DEFAULT NULL,
  `semester` varchar(10) DEFAULT NULL,
  `pre_requisite_id` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `subject_id`, `subject_code`, `subject`, `curriculum_name`, `lec_unit`, `lab_unit`, `lec_hours`, `lab_hours`, `year_level`, `year`, `semester`, `pre_requisite_id`, `created_at`) VALUES
(35, '2111477130de8c6f3c1fa4b06bb3ca8e', 'IT 101', 'Basic Programming Language', 'CCS 101', '0.0', '3.0', '0.0', '9.0', '3', '2023', '1', '9e37a076028fe2e674566097679fa211', '2024-12-15 00:55:58'),
(36, '62645197b2d65700eb00291a82d6dbf1', 'IT 102', 'Basic Machine Learning', 'CCS 101', '1.0', '0.0', '1.0', '0.0', '4', '2023', '1', '33ddd0117414a04c56ba9408bed83ae6', '2024-12-15 00:56:38'),
(37, '253ed1d679b0b05811daad478eb5fd44', 'SUM 101', 'Summer Subject 1', 'IT 101', '2.0', '0.0', '2.0', '0.0', '3', '2023', '1', '2d47330321f04d6ee66d4f51f2b86dd7', '2024-12-15 07:59:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `student_number` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `program` varchar(255) DEFAULT NULL,
  `current_year` varchar(255) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `role` varchar(10) NOT NULL,
  `api_key` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `last_login` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_id`, `profile`, `student_number`, `email`, `password`, `first_name`, `middle_name`, `last_name`, `program`, `current_year`, `status`, `role`, `api_key`, `token`, `last_login`, `created_at`) VALUES
(3, 'acb3cce51f76bca2d72a8d0e43092f48', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '', 'test@gmail.com', '$2y$10$wifhLo6aq8WP10YT4PCTa.yYxRwnA5e4FBlzMxxDcV9eGnLmhhBNG', 'Test', '', 'Test', NULL, NULL, 'verified', 'admin', '4af286c37f3867045795c73ca4edaa32', '', '2025-03-11 06:02:32', '2024-11-03 10:17:13'),
(5, 'b3ac709d66004148cd1763a7e17fbbe0', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '', 'ralpherinvergarasaniel@gmail.com', '$2y$10$7xEBA4IHfG8lWSdGDatbV.QIpZzJuY5Z7AZKUaEfm9IMjffiwf2rS', 'Ralph Erin', '', 'Saniel', NULL, NULL, 'verified', 'student', 'c2f8e3a842eac557b772db9d437309ec', '', '2024-11-13 02:19:33', '2024-11-13 02:19:08'),
(6, '66bf87d765323c17e68025afc4d91087', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '1234-1234', 'charlesmarquesesllarena@gmail.com', '$2y$10$ocQ8ywes1RFKCs8e4XJyXugp6nk.oZ6qCXquUp.liadBdYJxlOLfq', 'Charles', 'Marqueses', 'Llarena', 'Bachelor of Science in Information Technology', '2024-2025', 'verified', 'student', '7d6b0908862e7b9725c6e43668ac3e8c', '', '2024-12-17 03:12:21', '2024-11-24 12:44:54'),
(11, '63b64b414450b37b16781702d5f6d5e2', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '', 'admin@gmail.com', '$2y$10$y.rzxTYbVMWdLklcdtQAfeWjZM1qwy1foRziFSz/EQAVyFskpfiQ6', 'Test', '', 'Admin', NULL, NULL, 'verified', 'admin', 'b514059b00335f6e90c4b52a6a59438e', '', '2025-02-04 06:43:07', '2025-01-27 09:49:09'),
(14, 'd36c8ec8947588d226bde1448c651049', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '', 'toytoy@gmail.com', '$2y$10$qBzxBoUAaMSjdeDG2tGEWu5U9jnfdvT0mvTpoVL4aaKr6AydfNYV6', 'toy', 'o.', 'toy', NULL, NULL, 'verified', 'admin', '628e3876739283133cfbc2752213630c', '', '0000-00-00 00:00:00', '2025-01-27 11:14:29'),
(21, '0c84588f7c44871b362c0402f01b11d0', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '2025-0001', 'chin@gmail.com', '$2y$10$skmSnrkLZE5VpxgbV3LFx.UyZWfVLZnslHpdIwJgqW8T5S1m7Uts2', 'chin', 'oliva', 'marinay', 'Bachelor of Science in Information Technology with Specialization in Game Development', '2025-2026', 'verified', 'student', '6eb3fea89c8732e99a7048bd236ba390', '', '2025-02-03 22:45:19', '2025-02-02 23:14:28'),
(22, '2a89e4f1f84459e8e07779725b1c6814', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '', 'student@gmail.com', '$2y$10$567NhbXG4FOrTMlehA5EWO40W4BXqC4K/V/1KahRWU/AidZ5s5j8i', 'Test', 'Ing', 'Student', 'Bachelor of Science in Information Technology with BPO', '2014-2015', '', 'student', '04be50cd572092479dbc76cfb45fda0f', '', '0000-00-00 00:00:00', '2025-02-04 09:56:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `co_requisites`
--
ALTER TABLE `co_requisites`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `curriculum`
--
ALTER TABLE `curriculum`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pre_requisites`
--
ALTER TABLE `pre_requisites`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `co_requisites`
--
ALTER TABLE `co_requisites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5978139;

--
-- AUTO_INCREMENT for table `curriculum`
--
ALTER TABLE `curriculum`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `enrollment`
--
ALTER TABLE `enrollment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `pre_requisites`
--
ALTER TABLE `pre_requisites`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
