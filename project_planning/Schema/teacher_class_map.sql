CREATE TABLE `teacher_course_map` (
  `status` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `personnel_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  UNIQUE KEY `teacher_course_map_personnel_id_course_id_unique` (`personnel_id`,`course_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `teacher_course_map_ibfk_1` FOREIGN KEY (`personnel_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teacher_course_map_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `personnel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1