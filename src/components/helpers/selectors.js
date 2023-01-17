
const getAppointmentsForDay = function (state, day) {
  const dayObject = state.days.find(d => d.name === day);
  if (!dayObject) return [];

  return dayObject.appointments.map((id) => state.appointments[id]);
}

const getInterview = function (state, interview) {
  //interview contains: id, time, interview object (student, interviewer)
  //need to get the interviewer info from state.appointment.interview.interviewer (id) retrieve info from state.interview using state.appointments.interview.interviewer=== state.interviewers.id

  if (!interview) return null;
  const value = {student: interview.student, interviewer: state.interviewers[interview.interviewer]};

  return value;
};


const getInterviewersForDay = function (state, day) {
  const dayObject = state.days.find(d => d.name === day);
  if (!dayObject) return [];

  return dayObject.interviewers.map((id) => state.interviewers[id]);
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };