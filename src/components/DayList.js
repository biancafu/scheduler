import React from "react";
import classNames from "classnames";
import DayListItem from "./DayListItem";

export default function DayList(props){
  const listDays = props.days.map((day) => {
    return (<DayListItem 
    key={day.id}
    name={day.name}
    spots={day.spots}
    //need to check if i use day or props here
    selected={day.name === day.day}
    setDay={props.setDay}
    />);
  });
  return(
    <ul>
      {listDays}  
    </ul>
  )
}