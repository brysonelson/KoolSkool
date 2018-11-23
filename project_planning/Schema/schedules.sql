CREATE TABLE `schedules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `schedule_dttm` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `course_id` int(11) NOT NULL,
  `classroom_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  KEY `classroom_id` (`classroom_id`),
  CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `schedules_ibfk_2` FOREIGN KEY (`classroom_id`) REFERENCES `classrooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1