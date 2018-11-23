CREATE TABLE `classrooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location_descr` varchar(255) NOT NULL,
  `room_num` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1