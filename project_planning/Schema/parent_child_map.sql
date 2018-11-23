CREATE TABLE `parent_child_map` (
  `relationship` varchar(255) NOT NULL,
  `contact_sequence` tinyint(4) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  UNIQUE KEY `parent_child_map_parent_id_student_id_unique` (`parent_id`,`student_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `parent_child_map_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `parent_child_map_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `parents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1