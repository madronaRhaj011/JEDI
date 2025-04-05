-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2025 at 06:41 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jedidb`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `action_type` enum('added_stock','edited_stock','created_purchase_order','stock_adjustment','logged_in') NOT NULL,
  `action_details` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `user_id`, `action_type`, `action_details`, `created_at`) VALUES
(1, 8, 'logged_in', 'bot', '2025-03-03 06:53:25'),
(2, 8, 'logged_in', 'bot has logged in.', '2025-03-03 06:54:23'),
(3, 8, 'logged_in', 'bot has logged in.', '2025-03-03 07:48:43'),
(4, 8, 'logged_in', 'bot has logged in.', '2025-03-03 08:08:31'),
(5, 8, 'logged_in', 'bot has logged in.', '2025-03-03 08:22:17'),
(6, 8, 'logged_in', 'bot has logged in.', '2025-03-04 08:23:01'),
(7, 8, 'logged_in', 'bot has logged in.', '2025-03-04 08:41:41'),
(8, 8, 'logged_in', 'bot has logged in.', '2025-03-04 08:43:28'),
(9, 8, 'logged_in', 'bot has logged in.', '2025-03-04 08:45:47'),
(10, 8, 'logged_in', 'bot has logged in.', '2025-03-08 12:01:40'),
(11, 8, 'logged_in', 'bot has logged in.', '2025-03-08 12:02:59'),
(12, 8, 'logged_in', 'bot has logged in.', '2025-03-09 15:00:33'),
(13, 8, 'logged_in', 'bot has logged in.', '2025-03-09 21:48:25'),
(14, 8, 'logged_in', 'bot has logged in.', '2025-03-09 22:08:24'),
(15, 8, 'logged_in', 'bot has logged in.', '2025-03-09 22:10:14'),
(16, 8, 'logged_in', 'bot has logged in.', '2025-03-10 04:43:05'),
(17, 8, 'logged_in', 'bot has logged in.', '2025-03-10 05:03:48'),
(18, 8, 'logged_in', 'bot has logged in.', '2025-03-10 05:05:54'),
(19, 8, 'logged_in', 'bot has logged in.', '2025-03-10 05:34:14'),
(20, 8, 'logged_in', 'bot has logged in.', '2025-03-10 05:38:26'),
(21, 8, 'logged_in', 'bot has logged in.', '2025-03-10 05:41:50'),
(22, 8, 'logged_in', 'bot has logged in.', '2025-03-10 05:42:36'),
(23, 8, 'logged_in', 'bot has logged in.', '2025-03-10 05:49:26'),
(24, 8, 'logged_in', 'bot has logged in.', '2025-03-10 05:57:53'),
(25, 8, 'logged_in', 'bot has logged in.', '2025-03-10 05:59:25'),
(26, 8, 'logged_in', 'bot has logged in.', '2025-03-10 06:00:52'),
(27, 8, 'logged_in', 'bot has logged in.', '2025-03-10 06:05:01'),
(28, 8, 'logged_in', 'bot has logged in.', '2025-03-10 06:10:03'),
(29, 8, 'logged_in', 'bot has logged in.', '2025-03-10 06:12:05'),
(30, 8, 'logged_in', 'bot has logged in.', '2025-03-10 06:25:59'),
(31, 8, 'logged_in', 'bot has logged in.', '2025-03-10 06:36:53'),
(32, 8, 'logged_in', 'bot has logged in.', '2025-03-10 06:44:46'),
(33, 8, 'logged_in', 'bot has logged in.', '2025-03-10 06:48:35'),
(34, 8, 'logged_in', 'bot has logged in.', '2025-03-10 06:50:17'),
(35, 8, 'logged_in', 'bot has logged in.', '2025-03-10 06:53:31'),
(36, 8, 'logged_in', 'bot has logged in.', '2025-03-10 06:56:19'),
(37, 8, 'logged_in', 'bot has logged in.', '2025-03-10 06:57:26'),
(38, 8, 'logged_in', 'bot has logged in.', '2025-03-10 07:11:03'),
(39, 8, 'logged_in', 'bot has logged in.', '2025-03-10 07:19:33'),
(40, 8, 'logged_in', 'bot has logged in.', '2025-03-10 07:23:51'),
(41, 8, 'logged_in', 'bot has logged in.', '2025-03-10 07:24:44'),
(42, 8, 'logged_in', 'bot has logged in.', '2025-03-10 07:29:00'),
(43, 8, 'logged_in', 'bot has logged in.', '2025-03-10 07:30:06'),
(44, 8, 'logged_in', 'bot has logged in.', '2025-03-10 08:04:19'),
(45, 8, 'logged_in', 'bot has logged in.', '2025-03-10 08:07:37'),
(46, 8, 'logged_in', 'bot has logged in.', '2025-03-12 03:30:56'),
(47, 8, 'logged_in', 'bot has logged in.', '2025-03-12 03:47:24'),
(48, 8, 'logged_in', 'bot has logged in.', '2025-03-12 04:28:05'),
(49, 8, 'logged_in', 'bot has logged in.', '2025-03-12 06:10:23'),
(50, 8, 'logged_in', 'bot has logged in.', '2025-03-12 06:19:32'),
(51, 8, 'logged_in', 'bot has logged in.', '2025-03-12 07:05:11'),
(52, 8, 'logged_in', 'bot has logged in.', '2025-03-12 10:33:09'),
(53, 8, 'logged_in', 'bot has logged in.', '2025-03-13 07:16:50'),
(54, 8, 'logged_in', 'bot has logged in.', '2025-03-13 07:37:14'),
(55, 8, 'logged_in', 'bot has logged in.', '2025-03-13 12:09:26'),
(56, 8, 'logged_in', 'bot has logged in.', '2025-03-13 13:01:43'),
(57, 8, 'logged_in', 'bot has logged in.', '2025-03-13 13:04:03'),
(58, 8, 'logged_in', 'bot has logged in.', '2025-03-13 13:07:47'),
(59, 8, 'logged_in', 'bot has logged in.', '2025-03-13 13:07:53'),
(60, 8, 'logged_in', 'bot has logged in.', '2025-03-13 13:15:46'),
(61, 8, 'logged_in', 'bot has logged in.', '2025-03-13 23:39:38'),
(62, 8, 'logged_in', 'bot has logged in.', '2025-03-13 23:54:34'),
(63, 8, 'logged_in', 'bot has logged in.', '2025-03-13 23:55:05'),
(64, 8, 'logged_in', 'bot has logged in.', '2025-03-13 23:55:31'),
(65, 8, 'logged_in', 'bot has logged in.', '2025-03-13 23:58:18'),
(66, 8, 'logged_in', 'bot has logged in.', '2025-03-13 23:59:16'),
(67, 8, 'logged_in', 'bot has logged in.', '2025-03-13 23:59:58'),
(68, 8, 'logged_in', 'bot has logged in.', '2025-03-14 00:01:11'),
(69, 8, 'logged_in', 'bot has logged in.', '2025-03-14 00:09:19'),
(70, 8, 'logged_in', 'bot has logged in.', '2025-03-14 03:21:07'),
(71, 8, 'logged_in', 'bot has logged in.', '2025-03-14 03:31:43'),
(72, 8, 'logged_in', 'bot has logged in.', '2025-03-14 03:32:39'),
(73, 8, 'logged_in', 'bot has logged in.', '2025-03-14 03:38:25'),
(74, 8, 'logged_in', 'bot has logged in.', '2025-03-14 04:16:19'),
(75, 8, 'logged_in', 'bot has logged in.', '2025-03-14 09:16:52'),
(76, 8, 'logged_in', 'bot has logged in.', '2025-03-14 11:37:12'),
(77, 8, 'logged_in', 'bot has logged in.', '2025-03-14 17:14:46'),
(78, 8, 'logged_in', 'bot has logged in.', '2025-03-14 18:28:08'),
(79, 8, 'logged_in', 'bot has logged in.', '2025-03-14 18:54:44'),
(80, 8, 'logged_in', 'bot has logged in.', '2025-03-14 19:11:31'),
(81, 8, 'logged_in', 'bot has logged in.', '2025-03-14 19:13:51'),
(82, 8, 'logged_in', 'bot has logged in.', '2025-03-14 19:14:27'),
(83, 8, 'logged_in', 'bot has logged in.', '2025-03-14 19:21:12'),
(84, 8, 'logged_in', 'bot has logged in.', '2025-03-14 19:26:08'),
(85, 8, 'logged_in', 'bot has logged in.', '2025-03-15 05:48:39'),
(86, 8, 'logged_in', 'bot has logged in.', '2025-03-15 05:55:52'),
(87, 8, 'logged_in', 'bot has logged in.', '2025-03-15 07:56:08'),
(88, 8, 'logged_in', 'bot has logged in.', '2025-03-15 07:59:11'),
(89, 8, 'logged_in', 'bot has logged in.', '2025-03-15 14:20:53'),
(90, 8, 'logged_in', 'bot has logged in.', '2025-03-15 14:23:31'),
(91, 8, 'logged_in', 'bot has logged in.', '2025-03-16 04:39:17'),
(92, 8, 'logged_in', 'bot has logged in.', '2025-03-16 12:25:03'),
(93, 8, 'logged_in', 'bot has logged in.', '2025-03-16 13:26:16'),
(94, 8, 'logged_in', 'bot has logged in.', '2025-03-16 13:49:20'),
(95, 8, 'logged_in', 'bot has logged in.', '2025-03-16 14:06:36'),
(96, 8, 'logged_in', 'bot has logged in.', '2025-03-16 14:33:12'),
(97, 8, 'logged_in', 'bot has logged in.', '2025-03-16 14:35:05'),
(98, 8, 'logged_in', 'bot has logged in.', '2025-03-16 14:36:48'),
(99, 8, 'logged_in', 'bot has logged in.', '2025-03-16 14:39:50'),
(100, 8, 'logged_in', 'bot has logged in.', '2025-03-16 14:40:42'),
(101, 8, 'logged_in', 'bot has logged in.', '2025-03-16 14:44:51'),
(102, 8, 'logged_in', 'bot has logged in.', '2025-03-16 14:47:12'),
(103, 8, 'logged_in', 'bot has logged in.', '2025-03-16 14:49:20'),
(104, 8, 'logged_in', 'bot has logged in.', '2025-03-16 14:50:50'),
(105, 8, 'logged_in', 'bot has logged in.', '2025-03-16 16:15:07'),
(106, 8, 'logged_in', 'bot has logged in.', '2025-03-16 16:23:36'),
(107, 8, 'logged_in', 'bot has logged in.', '2025-03-16 16:35:11'),
(108, 8, 'logged_in', 'bot has logged in.', '2025-03-16 16:52:00'),
(109, 8, 'logged_in', 'bot has logged in.', '2025-03-16 16:53:26'),
(110, 8, 'logged_in', 'bot has logged in.', '2025-03-16 16:56:11'),
(111, 8, 'logged_in', 'bot has logged in.', '2025-03-16 17:08:55'),
(112, 8, 'logged_in', 'bot has logged in.', '2025-03-16 17:09:44'),
(113, 8, 'logged_in', 'bot has logged in.', '2025-03-16 17:25:08'),
(114, 8, 'logged_in', 'bot has logged in.', '2025-03-16 17:26:12'),
(115, 8, 'logged_in', 'bot has logged in.', '2025-03-16 17:40:10'),
(116, 8, 'logged_in', 'bot has logged in.', '2025-03-16 18:06:37'),
(117, 8, 'logged_in', 'bot has logged in.', '2025-03-16 18:11:34'),
(118, 8, 'logged_in', 'bot has logged in.', '2025-03-16 18:12:08'),
(119, 8, 'logged_in', 'bot has logged in.', '2025-03-16 18:29:53'),
(120, 8, 'logged_in', 'bot has logged in.', '2025-03-16 18:31:18'),
(121, 8, 'logged_in', 'bot has logged in.', '2025-03-16 18:43:35'),
(122, 8, 'logged_in', 'bot has logged in.', '2025-03-16 18:44:12'),
(123, 8, 'logged_in', 'bot has logged in.', '2025-03-16 18:46:08'),
(124, 8, 'logged_in', 'bot has logged in.', '2025-03-16 18:47:22'),
(125, 8, 'logged_in', 'bot has logged in.', '2025-03-16 18:48:17'),
(126, 8, 'logged_in', 'bot has logged in.', '2025-03-16 18:49:07'),
(127, 8, 'logged_in', 'bot has logged in.', '2025-03-17 03:05:28'),
(128, 8, 'logged_in', 'bot has logged in.', '2025-03-17 03:50:08'),
(129, 8, 'logged_in', 'bot has logged in.', '2025-03-17 04:08:54'),
(130, 8, 'logged_in', 'bot has logged in.', '2025-03-17 04:12:09'),
(131, 8, 'logged_in', 'bot has logged in.', '2025-03-17 06:19:42'),
(132, 8, 'logged_in', 'bot has logged in.', '2025-03-17 06:26:10'),
(133, 8, 'logged_in', 'bot has logged in.', '2025-03-17 06:55:51'),
(134, 8, 'logged_in', 'bot has logged in.', '2025-03-18 13:25:58'),
(135, 8, 'logged_in', 'bot has logged in.', '2025-03-18 13:58:46'),
(136, 8, 'logged_in', 'bot has logged in.', '2025-03-18 14:32:49'),
(137, 8, 'logged_in', 'bot has logged in.', '2025-03-18 14:34:13'),
(138, 8, 'logged_in', 'bot has logged in.', '2025-03-18 14:36:13'),
(139, 8, 'logged_in', 'bot has logged in.', '2025-03-18 14:48:16'),
(140, 8, 'logged_in', 'bot has logged in.', '2025-03-18 14:49:01'),
(141, 8, 'logged_in', 'bot has logged in.', '2025-03-18 14:49:35'),
(142, 8, 'logged_in', 'bot has logged in.', '2025-03-18 15:47:06'),
(143, 8, 'logged_in', 'bot has logged in.', '2025-03-18 15:48:37'),
(144, 8, 'logged_in', 'bot has logged in.', '2025-03-19 13:52:35'),
(145, 8, 'logged_in', 'bot has logged in.', '2025-03-19 13:56:36'),
(146, 8, 'logged_in', 'bot has logged in.', '2025-03-26 12:14:40'),
(147, 8, 'logged_in', 'bot has logged in.', '2025-03-28 02:30:44'),
(148, 8, 'logged_in', 'bot has logged in.', '2025-03-28 11:59:07'),
(149, 8, 'logged_in', 'bot has logged in.', '2025-03-28 12:41:51'),
(150, 8, 'logged_in', 'bot has logged in.', '2025-03-28 14:11:25'),
(151, 8, 'logged_in', 'bot has logged in.', '2025-03-28 14:28:04'),
(152, 8, 'logged_in', 'bot has logged in.', '2025-03-30 05:41:40'),
(153, 8, 'logged_in', 'bot has logged in.', '2025-03-30 06:18:59'),
(154, 8, 'logged_in', 'bot has logged in.', '2025-03-30 06:20:38'),
(155, 8, 'logged_in', 'bot has logged in.', '2025-03-30 06:21:41'),
(156, 8, 'logged_in', 'bot has logged in.', '2025-03-30 06:26:33'),
(157, 8, 'logged_in', 'bot has logged in.', '2025-03-30 06:29:48'),
(158, 8, 'logged_in', 'bot has logged in.', '2025-03-30 06:37:23'),
(159, 8, 'logged_in', 'bot has logged in.', '2025-03-30 06:38:58'),
(160, 8, 'logged_in', 'bot has logged in.', '2025-03-30 06:45:35'),
(161, 8, 'logged_in', 'bot has logged in.', '2025-03-30 06:51:16'),
(162, 8, 'logged_in', 'bot has logged in.', '2025-03-30 16:21:36'),
(163, 8, 'logged_in', 'bot has logged in.', '2025-03-30 23:40:05'),
(164, 8, 'logged_in', 'bot has logged in.', '2025-03-31 00:37:49'),
(165, 8, 'logged_in', 'bot has logged in.', '2025-03-31 01:55:40'),
(166, 8, 'logged_in', 'bot has logged in.', '2025-03-31 03:01:10'),
(167, 8, 'logged_in', 'bot has logged in.', '2025-03-31 03:23:43'),
(168, 8, 'logged_in', 'bot has logged in.', '2025-03-31 03:40:56'),
(169, 8, 'logged_in', 'bot has logged in.', '2025-03-31 04:55:27'),
(170, 8, 'logged_in', 'bot has logged in.', '2025-03-31 04:56:30'),
(171, 8, 'logged_in', 'bot has logged in.', '2025-03-31 04:58:33'),
(172, 8, 'logged_in', 'bot has logged in.', '2025-03-31 04:59:14'),
(173, 8, 'logged_in', 'bot has logged in.', '2025-03-31 05:00:05'),
(174, 8, 'logged_in', 'bot has logged in.', '2025-03-31 05:04:47'),
(175, 8, 'logged_in', 'bot has logged in.', '2025-03-31 05:18:03'),
(176, 8, 'logged_in', 'bot has logged in.', '2025-03-31 05:39:09'),
(177, 8, 'logged_in', 'bot has logged in.', '2025-03-31 05:45:17'),
(178, 8, 'logged_in', 'bot has logged in.', '2025-03-31 05:45:52'),
(179, 8, 'logged_in', 'bot has logged in.', '2025-03-31 12:01:00'),
(180, 8, 'logged_in', 'bot has logged in.', '2025-03-31 12:35:44'),
(181, 8, 'logged_in', 'bot has logged in.', '2025-03-31 12:45:56'),
(182, 8, 'logged_in', 'bot has logged in.', '2025-04-01 03:45:06'),
(183, 8, 'logged_in', 'bot has logged in.', '2025-04-01 03:49:34'),
(184, 8, 'logged_in', 'bot has logged in.', '2025-04-01 06:15:35'),
(185, 8, 'logged_in', 'bot has logged in.', '2025-04-01 07:17:56'),
(186, 8, 'logged_in', 'bot has logged in.', '2025-04-01 07:19:26'),
(187, 8, 'logged_in', 'bot has logged in.', '2025-04-01 07:20:54'),
(188, 8, 'logged_in', 'bot has logged in.', '2025-04-01 07:35:45'),
(189, 8, 'logged_in', 'bot has logged in.', '2025-04-01 08:14:32'),
(190, 8, 'logged_in', 'bot has logged in.', '2025-04-01 08:33:39'),
(191, 8, 'logged_in', 'bot has logged in.', '2025-04-01 08:40:27'),
(192, 8, 'logged_in', 'bot has logged in.', '2025-04-01 12:46:35'),
(193, 8, 'logged_in', 'bot has logged in.', '2025-04-01 12:56:07'),
(194, 8, 'logged_in', 'bot has logged in.', '2025-04-01 12:57:39'),
(195, 8, 'logged_in', 'bot has logged in.', '2025-04-01 13:11:47'),
(196, 8, 'logged_in', 'bot has logged in.', '2025-04-01 13:25:35'),
(197, 8, 'logged_in', 'bot has logged in.', '2025-04-01 13:25:45'),
(198, 8, 'logged_in', 'bot has logged in.', '2025-04-01 13:26:52'),
(199, 8, 'logged_in', 'bot has logged in.', '2025-04-01 13:29:34'),
(200, 8, 'logged_in', 'bot has logged in.', '2025-04-01 13:38:33'),
(201, 8, 'logged_in', 'bot has logged in.', '2025-04-01 13:51:29'),
(202, 8, 'logged_in', 'bot has logged in.', '2025-04-01 14:11:28'),
(203, 8, 'logged_in', 'bot has logged in.', '2025-04-01 14:14:49'),
(204, 8, 'logged_in', 'bot has logged in.', '2025-04-01 14:28:48'),
(205, 8, 'logged_in', 'bot has logged in.', '2025-04-01 15:01:59'),
(206, 8, 'logged_in', 'bot has logged in.', '2025-04-01 15:03:06'),
(207, 8, 'logged_in', 'bot has logged in.', '2025-04-01 15:11:40'),
(208, 8, 'logged_in', 'bot has logged in.', '2025-04-01 15:21:32'),
(209, 8, 'logged_in', 'bot has logged in.', '2025-04-01 16:21:28'),
(210, 8, 'logged_in', 'bot has logged in.', '2025-04-01 16:39:14'),
(211, 8, 'logged_in', 'bot has logged in.', '2025-04-01 16:47:38'),
(212, 8, 'logged_in', 'bot has logged in.', '2025-04-01 17:04:39'),
(213, 8, 'logged_in', 'bot has logged in.', '2025-04-01 17:45:13'),
(214, 8, 'logged_in', 'bot has logged in.', '2025-04-01 19:48:00'),
(215, 8, 'logged_in', 'bot has logged in.', '2025-04-01 19:57:58'),
(216, 8, 'logged_in', 'bot has logged in.', '2025-04-01 20:06:36'),
(217, 8, 'logged_in', 'bot has logged in.', '2025-04-01 20:09:26'),
(218, 8, 'logged_in', 'bot has logged in.', '2025-04-01 20:56:35'),
(219, 8, 'logged_in', 'bot has logged in.', '2025-04-02 04:40:15'),
(220, 8, 'logged_in', 'bot has logged in.', '2025-04-02 04:43:25'),
(221, 8, 'logged_in', 'bot has logged in.', '2025-04-02 05:41:07'),
(222, 8, 'logged_in', 'bot has logged in.', '2025-04-02 05:44:49'),
(223, 8, 'logged_in', 'bot has logged in.', '2025-04-02 05:53:53'),
(224, 8, 'logged_in', 'bot has logged in.', '2025-04-02 05:58:24'),
(225, 8, 'logged_in', 'bot has logged in.', '2025-04-02 06:00:09'),
(226, 8, 'logged_in', 'bot has logged in.', '2025-04-02 13:13:20'),
(227, 8, 'logged_in', 'bot has logged in.', '2025-04-02 15:47:17'),
(228, 8, 'logged_in', 'bot has logged in.', '2025-04-02 15:59:57'),
(229, 8, 'logged_in', 'bot has logged in.', '2025-04-03 14:26:27'),
(230, 8, 'logged_in', 'bot has logged in.', '2025-04-03 14:41:26'),
(231, 8, 'logged_in', 'bot has logged in.', '2025-04-03 14:47:12'),
(232, 8, 'logged_in', 'bot has logged in.', '2025-04-03 15:09:18'),
(233, 8, 'logged_in', 'bot has logged in.', '2025-04-03 15:46:18'),
(234, 8, 'logged_in', 'bot has logged in.', '2025-04-03 16:40:19');

-- --------------------------------------------------------

--
-- Table structure for table `demand_forecasts`
--

CREATE TABLE `demand_forecasts` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `forecasted_demand` int(11) NOT NULL,
  `forecasted_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_list`
--

CREATE TABLE `inventory_list` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `quantity_available` int(11) DEFAULT 0,
  `batch_number` int(50) DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `storage_location` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_list`
--

INSERT INTO `inventory_list` (`id`, `product_id`, `supplier_id`, `quantity_available`, `batch_number`, `expiry_date`, `storage_location`, `created_at`, `updated_at`) VALUES
(14, 10, 4, 2000, 1, '2025-02-27', 'Bonifacio Global City', '2025-03-02 17:21:37', '2025-03-16 14:51:36'),
(15, 10, 6, 2000, 2, '2025-03-13', 'Masipit', '2025-03-02 17:21:54', '2025-03-14 04:47:07'),
(16, 11, 4, 4700, 1, '2025-03-07', 'Masipit', '2025-03-03 05:54:56', '2025-03-28 14:36:51'),
(17, 10, 6, 100, 4, '2025-03-19', 'Masipit', '2025-03-10 06:49:22', '2025-03-16 14:51:14'),
(18, 10, 6, 2000, 5, '2025-03-14', 'Masipit', '2025-03-14 00:02:24', '2025-03-16 14:51:23'),
(20, 10, 5, 5000, 6, '2025-03-27', 'Caloocan', '2025-03-14 09:19:16', '2025-03-16 14:55:20'),
(21, 11, 4, 100, 2, '2025-03-18', 'Masipit', '2025-03-14 18:55:35', '2025-03-16 12:29:17'),
(22, 11, 4, 300, 3, '2025-03-19', 'Masipit', '2025-03-14 18:56:33', '2025-03-14 18:56:33'),
(23, 11, 6, 1000, 4, '2025-03-28', 'Masipit', '2025-03-15 07:19:09', '2025-03-15 07:19:09'),
(25, 11, 8, 400, 5, '2025-03-28', 'calapan', '2025-03-15 08:04:23', '2025-03-15 14:24:21');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_reports`
--

CREATE TABLE `inventory_reports` (
  `id` int(11) NOT NULL,
  `report_type` enum('aging','sales_performance','wastage') NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` text NOT NULL,
  `product_sku` text NOT NULL,
  `product_category` text NOT NULL,
  `total_quantity` int(11) NOT NULL,
  `unit_price` double(10,2) NOT NULL,
  `image_path` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_sku`, `product_category`, `total_quantity`, `unit_price`, `image_path`) VALUES
(10, 'tstest', 'test', 'sabon', 9090, 230.00, '/img/1740935734093.jpg'),
(11, 'test2', 'test2234', 'testt', 6500, 250.00, '/img/1740935769622.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_orders`
--

CREATE TABLE `purchase_orders` (
  `id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `status` enum('pending','approved','delivered','completed') DEFAULT 'pending',
  `order_date` date NOT NULL,
  `expected_delivery_date` date DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchase_orders`
--

INSERT INTO `purchase_orders` (`id`, `supplier_id`, `status`, `order_date`, `expected_delivery_date`, `total_amount`, `created_at`, `updated_at`) VALUES
(9, 4, 'completed', '2025-04-01', '2025-04-18', 65500.00, '2025-04-01 13:51:54', '2025-04-03 16:40:29'),
(10, 4, 'pending', '2025-04-01', '2025-04-25', 100000.00, '2025-04-01 16:23:49', '2025-04-03 15:51:59'),
(11, 4, 'pending', '2025-04-01', '2025-04-18', 16200.00, '2025-04-01 19:25:44', '2025-04-03 15:52:03');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_order_items`
--

CREATE TABLE `purchase_order_items` (
  `id` int(11) NOT NULL,
  `purchase_order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity_ordered` int(11) NOT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchase_order_items`
--

INSERT INTO `purchase_order_items` (`id`, `purchase_order_id`, `product_id`, `quantity_ordered`, `unit_price`, `created_at`, `updated_at`) VALUES
(3, 9, 11, 150, 250.00, '2025-04-01 13:51:54', '2025-04-01 13:51:54'),
(4, 9, 10, 100, 280.00, '2025-04-01 13:51:54', '2025-04-01 13:51:54'),
(5, 10, 11, 400, 250.00, '2025-04-01 16:23:49', '2025-04-01 16:23:49'),
(6, 11, 11, 20, 250.00, '2025-04-01 19:25:44', '2025-04-01 19:25:44'),
(7, 11, 10, 40, 280.00, '2025-04-01 19:25:44', '2025-04-01 19:25:44');

-- --------------------------------------------------------

--
-- Table structure for table `regional_stock_allocations`
--

CREATE TABLE `regional_stock_allocations` (
  `id` int(11) NOT NULL,
  `region` varchar(100) NOT NULL,
  `product_id` int(11) NOT NULL,
  `allocated_quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `sale_id` int(11) NOT NULL,
  `customer_name` text NOT NULL,
  `recorded_by` text NOT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `sale_date` date NOT NULL,
  `proof_of_sale` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`sale_id`, `customer_name`, `recorded_by`, `total_amount`, `sale_date`, `proof_of_sale`, `created_at`, `updated_at`) VALUES
(27, 'test', 'test', 8590.00, '2025-02-27', 'public\\proof_of_payment\\1740979937527-Screenshot 2024-08-29 190242.png', '2025-03-03 05:32:17', '2025-03-03 05:32:17'),
(28, 'test', 'test', 8590.00, '2025-02-27', 'public\\proof_of_payment\\1740980091690-Screenshot 2024-09-22 185337.png', '2025-03-03 05:34:51', '2025-03-03 05:34:51'),
(29, 'test', 'test', 2340.00, '2025-02-28', 'public\\proof_of_payment\\1740980146725-Screenshot 2024-08-29 190242.png', '2025-03-03 05:35:46', '2025-03-03 05:35:46'),
(30, 'testing', 'testing', 234.00, '2025-03-19', 'public\\proof_of_payment\\1740980397826-Screenshot 2024-08-29 190242.png', '2025-03-03 05:39:57', '2025-03-03 05:39:57'),
(31, 'testing', 'testing', 234.00, '2025-03-19', 'public\\proof_of_payment\\1740980463076-Screenshot 2024-08-29 190242.png', '2025-03-03 05:41:03', '2025-03-03 05:41:03'),
(32, 'testing', 'testing', 234.00, '2025-03-19', 'public\\proof_of_payment\\1740980707292-Screenshot 2024-08-29 190242.png', '2025-03-03 05:45:07', '2025-03-03 05:45:07'),
(33, 'Gwen B', 'Hanah', 3734.00, '2025-03-07', 'public\\proof_of_payment\\1740980779124-Screenshot 2024-09-22 185437.png', '2025-03-03 05:46:19', '2025-03-03 05:46:19'),
(34, 'Gwen B', 'Hanah', 2340.00, '2025-03-07', 'public\\proof_of_payment\\1740983081568-Screenshot 2024-08-29 190242.png', '2025-03-03 06:24:41', '2025-03-03 06:24:41'),
(35, 'Gwen B', 'Hanah', 50000.00, '2025-03-19', 'public\\proof_of_payment\\1743172241427-Screenshot 2024-09-22 185437.png', '2025-03-28 14:30:41', '2025-03-28 14:30:41'),
(36, 'Gwen B', 'Hannah', 25000.00, '2025-03-21', 'public\\proof_of_payment\\1743172611906-Screenshot 2024-09-29 204756.png', '2025-03-28 14:36:51', '2025-03-28 14:36:51');

-- --------------------------------------------------------

--
-- Table structure for table `sale_item`
--

CREATE TABLE `sale_item` (
  `id` int(11) NOT NULL,
  `sale_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity_sold` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sale_item`
--

INSERT INTO `sale_item` (`id`, `sale_id`, `product_id`, `quantity_sold`, `price`) VALUES
(43, 27, 10, 10, 2340),
(44, 27, 11, 25, 6250),
(45, 28, 10, 10, 2340),
(46, 28, 11, 25, 6250),
(47, 29, 10, 10, 2340),
(48, 30, 10, 1, 234),
(49, 31, 10, 1, 234),
(50, 32, 10, 1, 234),
(51, 33, 10, 1, 234),
(52, 33, 11, 14, 3500),
(53, 34, 10, 10, 2340),
(54, 35, 11, 200, 50000),
(55, 36, 11, 100, 25000);

-- --------------------------------------------------------

--
-- Table structure for table `stock_adjustments`
--

CREATE TABLE `stock_adjustments` (
  `id` int(11) NOT NULL,
  `inventory_id` int(11) NOT NULL,
  `quantity_adjusted` int(11) NOT NULL,
  `reason` text NOT NULL,
  `adjusted_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock_adjustments`
--

INSERT INTO `stock_adjustments` (`id`, `inventory_id`, `quantity_adjusted`, `reason`, `adjusted_by`, `created_at`, `updated_at`) VALUES
(8, 14, -1000, 'testing', 8, '2025-03-16 14:40:05', '2025-03-16 14:40:05'),
(9, 14, 1000, 'testing', 8, '2025-03-16 14:41:28', '2025-03-16 14:41:28'),
(10, 14, -1000, 'testing', 8, '2025-03-16 14:42:44', '2025-03-16 14:42:44'),
(11, 14, 1000, 'testing', 8, '2025-03-16 14:45:17', '2025-03-16 14:45:17'),
(12, 14, -1000, 'may mali sa record', 8, '2025-03-16 14:45:42', '2025-03-16 14:45:42'),
(13, 14, 1000, 'testing', 8, '2025-03-16 14:49:33', '2025-03-16 14:49:33'),
(14, 16, 3000, '', 8, '2025-03-16 14:49:48', '2025-03-16 14:49:48');

-- --------------------------------------------------------

--
-- Table structure for table `stock_alerts`
--

CREATE TABLE `stock_alerts` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `threshold_value` int(11) NOT NULL,
  `days_before_alert_period` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock_alerts`
--

INSERT INTO `stock_alerts` (`id`, `product_id`, `threshold_value`, `days_before_alert_period`, `created_at`, `updated_at`) VALUES
(2, 10, 20, 10, '2025-03-16 17:17:10', '2025-03-28 12:49:07');

-- --------------------------------------------------------

--
-- Table structure for table `stock_movements`
--

CREATE TABLE `stock_movements` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `movement_type` enum('in','out') NOT NULL,
  `quantity` int(11) NOT NULL,
  `reason` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock_movements`
--

INSERT INTO `stock_movements` (`id`, `product_id`, `movement_type`, `quantity`, `reason`, `user_id`, `created_at`, `updated_at`) VALUES
(8, 7, 'in', 125, 'Add new Product', 8, '2025-03-01 16:31:48', '2025-03-01 16:31:48'),
(9, 8, 'in', 0, 'Add new Product', 8, '2025-03-02 08:27:52', '2025-03-02 08:27:52'),
(10, 11, 'in', 2000, 'New Supplier Delivery', 8, '2025-03-02 09:11:18', '2025-03-02 09:11:18'),
(11, 12, 'in', 2000, 'New Supplier Delivery', 8, '2025-03-02 09:44:40', '2025-03-02 09:44:40'),
(12, 9, 'in', 0, 'Add new Product', 8, '2025-03-02 09:47:34', '2025-03-02 09:47:34'),
(13, 13, 'in', 2000, 'New Supplier Delivery', 8, '2025-03-02 09:47:45', '2025-03-02 09:47:45'),
(14, 10, 'in', 0, 'Add new Product', 8, '2025-03-02 17:15:34', '2025-03-02 17:15:34'),
(15, 11, 'in', 0, 'Add new Product', 8, '2025-03-02 17:16:09', '2025-03-02 17:16:09'),
(16, 14, 'in', 2000, 'New Supplier Delivery', 8, '2025-03-02 17:21:37', '2025-03-02 17:21:37'),
(17, 15, 'in', 2000, 'New Supplier Delivery', 8, '2025-03-02 17:21:54', '2025-03-02 17:21:54'),
(18, 16, 'in', 2000, 'New Supplier Delivery', 8, '2025-03-03 05:54:56', '2025-03-03 05:54:56'),
(19, 17, 'in', 2000, 'New Supplier Delivery', 8, '2025-03-10 06:49:22', '2025-03-10 06:49:22'),
(20, 18, 'in', 2000, 'New Supplier Delivery', 8, '2025-03-14 00:02:24', '2025-03-14 00:02:24'),
(21, 19, 'in', 5000, 'New Supplier Delivery', 8, '2025-03-14 09:17:18', '2025-03-14 09:17:18'),
(22, 20, 'in', 5000, 'New Supplier Delivery', 8, '2025-03-14 09:19:16', '2025-03-14 09:19:16'),
(23, 21, 'in', 300, 'New Supplier Delivery', 8, '2025-03-14 18:55:35', '2025-03-14 18:55:35'),
(24, 22, 'in', 300, 'New Supplier Delivery', 8, '2025-03-14 18:56:33', '2025-03-14 18:56:33'),
(25, 23, 'in', 1000, 'New Supplier Delivery', 8, '2025-03-15 07:19:09', '2025-03-15 07:19:09'),
(26, 25, 'in', 300, 'New Supplier Delivery', 8, '2025-03-15 08:04:23', '2025-03-15 08:04:23');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `supplier_name` varchar(100) NOT NULL,
  `contact_person` varchar(255) NOT NULL,
  `email` text NOT NULL,
  `phone_number` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `supplier_name`, `contact_person`, `email`, `phone_number`, `address`, `created_at`, `updated_at`) VALUES
(4, 'Supplier A', 'Hanah Mendoza', 'suppliera@gmail.com', 33356565, 'malay_ko street gentri', '2025-03-10 05:09:15', '2025-04-02 15:48:35'),
(5, 'Supplier B', 'Gwen Basconcillo', 'supplierb@gmail.com', 2147483647, 'ewan ko street oriental mindoro', '2025-03-10 06:00:59', '2025-03-10 06:00:59'),
(6, 'Supplier C', 'Test Basconcillo', 'supplierc@gmail.com', 2147483647, 'ewan ko street oriental mindoro', '2025-03-10 06:04:29', '2025-03-10 06:04:29'),
(7, 'Supplier D', 'Test Test', 'test@gmail.com', 2147483647, 'ewan ko street oriental mindoro', '2025-03-10 06:06:17', '2025-03-10 06:06:17'),
(8, 'Supplier E', 'Test Mendoza', 'supplierE@gmail.com', 2147483647, 'ewan ko street oriental mindoro', '2025-03-10 06:11:03', '2025-03-10 06:11:03');

-- --------------------------------------------------------

--
-- Table structure for table `supplier_agreements`
--

CREATE TABLE `supplier_agreements` (
  `id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `pricing_agreement` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier_agreements`
--

INSERT INTO `supplier_agreements` (`id`, `supplier_id`, `product_id`, `pricing_agreement`, `created_at`, `updated_at`) VALUES
(1, 4, 11, '250', '2025-03-31 12:56:19', '2025-03-31 12:56:19'),
(2, 4, 10, '280', '2025-04-01 14:37:14', '2025-04-01 14:37:14');

-- --------------------------------------------------------

--
-- Table structure for table `supplier_performance_review`
--

CREATE TABLE `supplier_performance_review` (
  `id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `purchase_order_id` int(11) NOT NULL,
  `date_delivered` date NOT NULL,
  `product_quality_score` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier_performance_review`
--

INSERT INTO `supplier_performance_review` (`id`, `supplier_id`, `purchase_order_id`, `date_delivered`, `product_quality_score`, `created_at`, `updated_at`) VALUES
(3, 4, 11, '2025-04-03', 5, '2025-04-03 15:09:27', '2025-04-03 15:09:27'),
(4, 4, 9, '2025-04-03', 5, '2025-04-03 15:16:09', '2025-04-03 15:16:09'),
(5, 4, 9, '2025-04-03', 5, '2025-04-03 15:52:48', '2025-04-03 15:52:48');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','stock_manager','sales_personnel') NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password_hash`, `role`, `email`, `created_at`, `updated_at`) VALUES
(1, 'hanah', '$2b$10$frwbptY8CLOysIfjRBBQIO.5fKKFio4GGdwYVpSnjih7fb//9okEW', 'stock_manager', 'hanah@gmail.com', '2025-02-18 04:52:32', '2025-02-24 04:19:24'),
(2, 'Gwenb', '$2b$10$HiEO1D.xcJWjHRbX7l8Wi.xBvZ3wJKidNeAW6ticqySNJkj9Sz9y.', 'admin', 'gwen@gmail.com', '2025-02-18 05:14:03', '2025-02-18 05:14:03'),
(3, 'jakepaul', '$2b$10$MOA5XgxQ4iV15e0QA8HJHu.eZgwZscoA9nvjtr0YFJmPT0IDJ5fP6', 'admin', 'jakepaul@gmail.com', '2025-02-18 15:30:44', '2025-02-18 15:30:44'),
(7, 'thomas', '$2b$10$8SXnf8eG/.M.8XdPRxOXx.CUmT.qNWLg1956noD5pAiG0xb5qBvUm', 'admin', 'thomas@gmail.com', '2025-02-19 16:32:50', '2025-02-19 16:32:50'),
(8, 'bot', '$2b$10$6XNofMB.iP9LMi59MlrrKuCyFq2JXW8zBnz0uILgW9UjDh9c5..1K', 'admin', 'bot@gmail.com', '2025-02-20 15:27:20', '2025-02-23 16:02:32'),
(9, 'andrew', '$2b$10$wzybAAUD8pzx9Qf7nmwWeOu0ONmqw4SMOP/NlLtRwQ5y4TsCb3LSq', 'admin', 'andrew@gmail.com', '2025-02-22 07:14:40', '2025-02-22 07:14:40'),
(10, 'doe', '$2b$10$w.9fy.Q59sbDC9Qid9HFmOLBlJnxaWO3tQx41qLp35yR9fWOUBIdm', 'admin', 'doe@gmail.com', '2025-02-22 07:18:09', '2025-02-22 07:18:09'),
(11, 'lebron', '$2b$10$gTLzJoUI3s53ZWlUeU8Roevdneu/mfsf5d.DSc3qDJxgybAAx1xVe', 'admin', 'lebron@gmail.com', '2025-02-22 07:25:15', '2025-02-22 07:25:15'),
(12, 'let', '$2b$10$K1Tgw67b0NC0rbfCIOsIgupT.KKnelmjFdVjW2Io7/05IBYIioW/y', 'admin', 'let@gmail.com', '2025-02-22 07:26:57', '2025-02-22 07:26:57'),
(13, 'jedi', '$2b$10$BYAz6nhu3v7itRiLj.SHneTonbj52J0Cd1rH4ZZtqiKx/ks9pOBlW', 'admin', 'jedi@gmail.com', '2025-02-24 08:03:32', '2025-02-24 08:03:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `demand_forecasts`
--
ALTER TABLE `demand_forecasts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `inventory_list`
--
ALTER TABLE `inventory_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `fk_product_id` (`product_id`);

--
-- Indexes for table `inventory_reports`
--
ALTER TABLE `inventory_reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchase_order_id` (`purchase_order_id`),
  ADD KEY `fk_product` (`product_id`);

--
-- Indexes for table `regional_stock_allocations`
--
ALTER TABLE `regional_stock_allocations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`sale_id`);

--
-- Indexes for table `sale_item`
--
ALTER TABLE `sale_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock_adjustments`
--
ALTER TABLE `stock_adjustments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adjusted_by` (`adjusted_by`),
  ADD KEY `fk_inventory_id` (`inventory_id`);

--
-- Indexes for table `stock_alerts`
--
ALTER TABLE `stock_alerts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stock_alerts_ibfk_1` (`product_id`);

--
-- Indexes for table `stock_movements`
--
ALTER TABLE `stock_movements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplier_agreements`
--
ALTER TABLE `supplier_agreements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_supplier_id` (`supplier_id`),
  ADD KEY `fk_productid_unique` (`product_id`);

--
-- Indexes for table `supplier_performance_review`
--
ALTER TABLE `supplier_performance_review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_purchase_orders_id` (`purchase_order_id`),
  ADD KEY `fk_review_supplier_id` (`supplier_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=235;

--
-- AUTO_INCREMENT for table `demand_forecasts`
--
ALTER TABLE `demand_forecasts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_list`
--
ALTER TABLE `inventory_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `inventory_reports`
--
ALTER TABLE `inventory_reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `regional_stock_allocations`
--
ALTER TABLE `regional_stock_allocations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `sale_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `sale_item`
--
ALTER TABLE `sale_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `stock_adjustments`
--
ALTER TABLE `stock_adjustments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `stock_alerts`
--
ALTER TABLE `stock_alerts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `stock_movements`
--
ALTER TABLE `stock_movements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `supplier_agreements`
--
ALTER TABLE `supplier_agreements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `supplier_performance_review`
--
ALTER TABLE `supplier_performance_review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `demand_forecasts`
--
ALTER TABLE `demand_forecasts`
  ADD CONSTRAINT `demand_forecasts_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `inventory_list` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `inventory_list`
--
ALTER TABLE `inventory_list`
  ADD CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inventory_list_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  ADD CONSTRAINT `purchase_orders_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  ADD CONSTRAINT `fk_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `purchase_order_items_ibfk_1` FOREIGN KEY (`purchase_order_id`) REFERENCES `purchase_orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `regional_stock_allocations`
--
ALTER TABLE `regional_stock_allocations`
  ADD CONSTRAINT `regional_stock_allocations_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `inventory_list` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `stock_adjustments`
--
ALTER TABLE `stock_adjustments`
  ADD CONSTRAINT `fk_inventory_id` FOREIGN KEY (`inventory_id`) REFERENCES `inventory_list` (`id`),
  ADD CONSTRAINT `stock_adjustments_ibfk_2` FOREIGN KEY (`adjusted_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `stock_alerts`
--
ALTER TABLE `stock_alerts`
  ADD CONSTRAINT `stock_alerts_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `stock_movements`
--
ALTER TABLE `stock_movements`
  ADD CONSTRAINT `stock_movements_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `supplier_agreements`
--
ALTER TABLE `supplier_agreements`
  ADD CONSTRAINT `fk_productid_unique` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `fk_supplier_id` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`);

--
-- Constraints for table `supplier_performance_review`
--
ALTER TABLE `supplier_performance_review`
  ADD CONSTRAINT `fk_purchase_orders_id` FOREIGN KEY (`purchase_order_id`) REFERENCES `purchase_orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_review_supplier_id` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
