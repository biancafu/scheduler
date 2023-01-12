import React from "react";
import classNames from "classnames";
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';

const InterviewerList = function (props) {
  const listInterviewer = props.interviewers.map((interviewerItem) => {
    return (
      <InterviewerListItem
        key = {interviewerItem.id}
        name = {interviewerItem.name}
        avatar = {interviewerItem.avatar}
        selected = {interviewerItem.id === props.interviewer}
        setInterviewer = {() => props.setInterviewer(interviewerItem.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {listInterviewer}
      </ul>
    </section>
  );
}


export default InterviewerList;