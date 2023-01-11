import React from "react";
import classNames from "classnames";
import DayListItem from "./DayListItem";

export default function DayList(props){
  const listDays = props.days.map((day) => {
    return (<DayListItem 
    key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === day.day}
    setDay={day.setDay}
    />);
  });
  return(
    <ul>
      {listDays}  
    </ul>
  )
}