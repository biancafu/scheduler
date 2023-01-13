
 function getAppointmentsForDay(state, day) {
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

module.exports = {getAppointmentsForDay};