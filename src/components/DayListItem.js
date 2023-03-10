import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

const formatSpots = function (spots) {
  if (spots === 0) {
    return "no spots remaining";
  } else if (spots === 1) {
    return "1 spot remaining";
  }
  return `${spots} spots remaining`;
}

export default function DayListItem(props) {
  const full = props.spots === 0 ? true : false;
  const dayClass = classNames('day-list__item',
    {
      'day-list__item--selected': props.selected,
      'day-list__item--full': full
    });


  return (
    <li
      className={dayClass}
      onClick={props.setDay}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}