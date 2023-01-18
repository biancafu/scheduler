import React, { useState, useEffect } from "react";
import { getAppointmentsForDay } from "components/helpers/selectors";
import axios from "axios";

const useApplicationData = function () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

  const updateSpots = function (state) {
    const new_days = [];
    for (let day of state.days) {
      let current_spots = 0;
      let copy_day = day;
      //calculate current spots for the day
      //use day.appointment array to get id of appointments
      const appointment_ids = day.appointments;
      for (let id of appointment_ids) {
        //use id of appointments to check interview 
        const appointment_data = state.appointments[id];
        if (!appointment_data.interview) current_spots += 1;
      }
      //update spots for each day
      console.log('current_spots', current_spots);
      copy_day.spots = current_spots;
      new_days.push(copy_day);
    }
    //update state.days 
    console.log(new_days);
    setState({
      ...state,
      days: new_days
    });
  };

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const new_state = { ...state, appointments };
        setState(new_state);
        updateSpots(new_state);
      })
  };
  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const new_state = { ...state, appointments };
        setState(new_state);
        updateSpots(new_state);
      })
  };


  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);


  return { state, setDay, bookInterview, cancelInterview }
}

export default useApplicationData