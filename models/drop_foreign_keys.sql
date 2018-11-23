ALTER TABLE `teacher_course_maps` DROP foreign key `teacher_course_maps_ibfk_1`;
ALTER TABLE `teacher_course_maps` DROP foreign key `teacher_course_maps_ibfk_2`;
DROP INDEX teacher_course_maps_personnel_id_course_id_unique ON `personnel`

ALTER TABLE `personnel` DROP foreign key `personnel_ibfk_1`;
DROP INDEX reports_to_id ON `personnel`;