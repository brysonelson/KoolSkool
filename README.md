# KoolSkool Tool
Bootcamp Assignment 11/17/18 - Group Project 2:

## Tables
Tables are created via models through sequelize. there is a .js file for each table.  In the circumstance that someone would want to create the database without using sequelize, the SQL files can be found under `project_planning\Schema\[tablename].sql`.  Tables must be created in a specific order due to relationships and foreign key contraints.
  * Students
  * Courses
  * Attendence
  * Classrooms
  * Parents
  * parent_child_map
  * personnel
  * schedules
  * student_course_map
  * teacher_course_map

Because of dependencies, If manually dropping tables, they must be dropped in a specific order:
<code>
DROP TABLE IF EXISTS `teacher_course_map`;
DROP TABLE IF EXISTS `student_course_map`;
DROP TABLE IF EXISTS `Schedules`;
DROP TABLE IF EXISTS `Personnel`;
DROP TABLE IF EXISTS `parent_child_map`;
DROP TABLE IF EXISTS `Parents`;
DROP TABLE IF EXISTS `Classrooms`;
DROP TABLE IF EXISTS `Attendence`;
DROP TABLE IF EXISTS `Courses`;
DROP TABLE IF EXISTS `Students`;
</code>

## Seeds
SQL Seeds must be entered in a specific order
  * student_seeds.sql 
  * parents_seeds.sql 
  * parent_child_seeds.sql 
  * personnel_seeds.sql 
  * courses_seeds.sql 
  * teacher_course_seeds.sql 
  * classrooms_seeds.sql 
  * schedules_seeds.sql 
  * student_course_seeds.sql 
  * attendence_seeds.sql