-- Primary Phone Numbers for all parents in the system (result will be 59 phone numbers)
USE koolskool_db;

SELECT p.phone_num_primary FROM students s

INNER JOIN parent_child_map pcm

ON s.id = pcm.student_id

INNER JOIN parents p

ON pcm.parent_id = p.id;

-- Alternate phone numbers for all parents who provided an alternate (result will be 27 phone numbers)
USE koolskool_db;

SELECT
p.phone_num_alt FROM students s

INNER JOIN parent_child_map pcm

ON s.id = pcm.student_id

INNER JOIN parents p

ON pcm.parent_id = p.id

WHERE p.phone_num_alt is not null and length (p.phone_num_alt) <> 0;


-- You can modify the above two queries with an additional join and WHERE clause to filter to only those students who are also in the attendence table.  You'll need to pass the attendence date into the query as a variable.  This example matches to a date that is in the database now.
USE koolskool_db;

SELECT p.phone_num_primary FROM students s

INNER JOIN parent_child_map pcm

ON s.id = pcm.student_id

INNER JOIN parents p

ON pcm.parent_id = p.id;
INNER JOIN attendence a

ON s.id = a.student_id

WHERE a.attendence_dt = '2018-11-22'

-- Primary Phone Numbers for all personnel in the system (result will be 20 rows)
USE koolskool_db;

SELECT p.phone_num_primary FROM personnel p

-- Primary Phone Numbers for all personnel in the system who are assigned to teach a course and where the attendence date matches to the variable passed into the query. (result will be 18 rows)
USE koolskool_db;

SELECT p.phone_num_primary FROM personnel p

INNER JOIN teacher_course_map tcm

ON p.id = tcm.personnel_id

INNER JOIN attendence a 

ON tcm.course_id = a.course_id

Where a.attendence_dt = '2018-11-22'

-- You can modify the above two queries to pull alternate phone numbers too.
USE koolskool_db;

SELECT p.phone_num_alt FROM personnel p
WHERE p.phone_num_alt is not null and length (p.phone_num_alt) <> 0;


USE koolskool_db;

p.phone_num_alt FROM personnel p

INNER JOIN teacher_course_map tcm

ON p.id = tcm.personnel_id

INNER JOIN attendence a 

ON tcm.course_id = a.course_id
WHERE p.phone_num_alt is not null and length (p.phone_num_alt) <> 0;

AND a.attendence_dt = '2018-11-22'

-- Pull all phone numbers into one result: (result is 111 records Note:  Union statements result in distinct records)
-- Primary Phone Numbers for all parents in the system (result will be 59 phone numbers)

USE koolskool_db;

SELECT p.phone_num_primary as phone 

FROM students s

INNER JOIN parent_child_map pcm

ON s.id = pcm.student_id

INNER JOIN parents p

ON pcm.parent_id = p.id


UNION


-- Alternate phone numbers for all parents who provided an alternate (result will be 27 phone numbers)

SELECT

p.phone_num_alt as phone 

FROM students s

INNER JOIN parent_child_map pcm

ON s.id = pcm.student_id

INNER JOIN parents p

ON pcm.parent_id = p.id

WHERE p.phone_num_alt is not null and length (p.phone_num_alt) <> 0


UNION


-- Primary Phone Numbers for all personnel in the system (result will be 20 rows)

SELECT p.phone_num_primary as phone 
FROM personnel p


UNION


-- Alternate Phone Numbers for all personnel in the system (result will be 8 rows)

SELECT p.phone_num_alt as phone 
FROM personnel p

WHERE p.phone_num_alt is not null and length (p.phone_num_alt) <> 0


