
 const getAppointmentsForDay = function(state, day) {
  //state contains two object: 
  //1)days (array of objects) 2)appointments (object of objects)

  //get state.appointments (array of ids) from the day given
  const filtered_appointments = state.days.filter(dayElements => dayElements.name === day);
  if (filtered_appointments.length === 0) return [];
  const appointments_id_array = filtered_appointments[0].appointments;
  const appointments_objects = Object.values(state.appointments);

  //find the appointments for that day, return an array of objects of those appointments
  const appointments = appointments_objects.filter(appointment => appointments_id_array.includes(appointment.id));
  return appointments;
}

const getInterview = function(state, interview) {
  //interview contains: id, time, interview object (student, interviewer)
  //need to get the interviewer info from state.appointment.interview.interviewer (id) retrieve info from state.interview using state.appointments.interview.interviewer=== state.interviewers.id
  if (!interview) return null;

  const id = interview.interviewer;
  // if (!Object.keys(state.interviewers).contains(id)) return null;
  interview.interviewer = state.interviewers[id];

  return interview;


};

module.exports = { getAppointmentsForDay, getInterview };