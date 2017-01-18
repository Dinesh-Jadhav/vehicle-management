-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2016 at 02:22 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.5.37

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vehicle_admin`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_master`
--

CREATE TABLE `admin_master` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(255) NOT NULL,
  `exchange_rate` varchar(255) NOT NULL,
  `forget_token` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_master`
--

INSERT INTO `admin_master` (`id`, `username`, `email`, `password`, `exchange_rate`, `forget_token`, `status`) VALUES
(1, 'admin', 'sbamniya23@gmail.com', '21232f297a57a5a743894a0e4a801fc3', '2.5', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `exchange_request`
--

CREATE TABLE `exchange_request` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `hours` varchar(255) NOT NULL,
  `current_exchange_rate` varchar(255) NOT NULL COMMENT 'Exchange Rate at Vendor Applied',
  `status` int(11) NOT NULL COMMENT '0-Requested, 1-Approved '
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ongoing_trips`
--

CREATE TABLE `ongoing_trips` (
  `id` bigint(20) NOT NULL,
  `owner_id` bigint(20) NOT NULL,
  `new_user_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_date` date NOT NULL,
  `end_time` time NOT NULL,
  `amount` varchar(25) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `requester_id` bigint(20) NOT NULL,
  `status` int(11) NOT NULL COMMENT '0-Cancelled, 1- ongoing, 2-completed'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `recharges`
--

CREATE TABLE `recharges` (
  `id` bigint(20) NOT NULL,
  `debit_id` bigint(20) NOT NULL,
  `chennel` varchar(52) NOT NULL COMMENT 'Online, Offline',
  `time` time NOT NULL COMMENT 'value of recharge',
  `amount` varchar(11) NOT NULL COMMENT 'balance get by user',
  `credit_id` bigint(20) NOT NULL COMMENT '0-offline, 1-online'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_master`
--

CREATE TABLE `user_master` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `lisence_file` varchar(255) NOT NULL,
  `license_number` varchar(500) NOT NULL,
  `mobile_number` varchar(250) NOT NULL,
  `balance` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `multiplier` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `di_number` varchar(255) NOT NULL,
  `pin` varchar(255) NOT NULL,
  `forget_token` text NOT NULL,
  `user_type` int(11) NOT NULL COMMENT '1-user 2-Vendor',
  `status` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_master`
--

INSERT INTO `user_master` (`id`, `name`, `email`, `password`, `lisence_file`, `license_number`, `mobile_number`, `balance`, `dob`, `multiplier`, `url`, `di_number`, `pin`, `forget_token`, `user_type`, `status`) VALUES
(1000000, 'Sonu', '', '', '', '', '860000000', '0', '2016-12-23', '', '', '', '452010', '', 1, 'Y'),
(1000001, 'Amit Mehra', '', '', '', '', '8878220874', '0', '0000-00-00', '', '', '', '452010', '', 2, 'Y'),
(1000002, 'Sonu Bamniya', 'sbamniya23@gmail.com', 'bb93f900a25334e5da5de097804af6a4', '1481096078824-Profile_img-Copy.jpg', '', '8878220874', '0', '0000-00-00', '1', '', '', '45010', '', 2, 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `trip_id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `reg_number` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` int(11) NOT NULL COMMENT '0-Idle, 1-In-use, -1- Deactivate'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_master`
--
ALTER TABLE `admin_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exchange_request`
--
ALTER TABLE `exchange_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ongoing_trips`
--
ALTER TABLE `ongoing_trips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recharges`
--
ALTER TABLE `recharges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_master`
--
ALTER TABLE `user_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_master`
--
ALTER TABLE `admin_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `exchange_request`
--
ALTER TABLE `exchange_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ongoing_trips`
--
ALTER TABLE `ongoing_trips`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `recharges`
--
ALTER TABLE `recharges`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user_master`
--
ALTER TABLE `user_master`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000003;
--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
