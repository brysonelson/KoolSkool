module.exports = function(sequelize) {
  var v_attendence = sequelize.query(
    "Select DISTINCT c.course_descr, s.first_name, s.last_name, a.absent from courses c inner join student_course_map m  on c.id = m.course_id inner join students s on m.student_id = s.id inner join attendence a on m.student_id = a.student_id and m.course_id = a.course_id Where a.attendence_dt = '2018-12-02'",
    {
      type: sequelize.QueryTypes.SELECT
    }
  );
  return v_attendence;
};
