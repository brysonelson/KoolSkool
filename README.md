# KoolSkool Tool
Bootcamp Assignment 11/17/18 - Group Project 2:

## Demo
*Kool Skool Tool!* is deployed to Heroku.  Please check it out [here](https://kool-skool-tool-11235.herokuapp.com/login).

Because our app requires an authentic login to work properly we've created these 4 special logins for purposes of demonstrating the application's functionality.  
1. Admin User - Authorized to view the content management system (/cms) as well as teacher and parent dashboards
2. Teacher - Authorized to view the teacher dashbards (/teacher-dashboard)
3. Parent -  Authorized to view the parent dashboards (/parent-dashboard)
4. Emergency - This part of our application is intended to be used to notify parents in the event of an emergency via text message.  For this reason, only super-admin (i.e., the principal) will be allowed to use this component.

## Technology
### Hosting Platform
  * Heroku (https://www.heroku.com/home)
### Front-End
  * HTML, CSS, JavaScript, jQuery
  * Bootstrap v4 (https://getbootstrap.com/)
### Back-End
  * Javascript, jQuery
  * Node.js (https://nodejs.org/en/)
  * Express.js (https://expressjs.com/)
  * Handlebars.js (http://handlebarsjs.com/)
  * MySQL
  * Sequelize
  * Passportjs (http://www.passportjs.org/)
  * MomentJS (https://momentjs.com/)

## Installation
To install the application follow the instructions below:
```
git clone https://github.com/SueJStevens/KoolSkool
cd KoolSkool
npm install
```
## Running Locally
The app requires a local MySQL Server.  Locate the folder `db` and run `Schema.sql`.

To run the application locally and access it in your browser, first set the `PORT` environment variable to the value of your choice.  An example is shown below.
```
export PORT=3000
```
After the `PORT` environment variable has been set, run the Node.js application with the command below.
```
node server.js
```
The application will now be running locally on `PORT`, in this case that is `PORT 3000` You can then access it locally from your browser at the URL `localhost:PORT`, in this case `localhost:3000`.

Sequelize will create the tables in your database automatically, but you will then need to populate some data.  You can use the provided `seeds.sql` to set up the database in your local environment.  However, they need to be intalled in a particular order.

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

To run the application locally and access it in your browser, first set the `PORT` environment variable to the value of your choice.  An example is shown below.
```
export PORT=8080
```
After the `PORT` environment variable has been set, run the Node.js application with the command below.
```
node server.js
```
The application will now be running locally on `PORT`, in this case that is `PORT 8080` You can then access it locally from your browser at the URL `localhost:PORT`, in this case `localhost:8080`.

Before you can log into the app you will need to create a user.  You can create a user from the /signup.