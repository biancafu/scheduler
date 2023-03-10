import React from "react";
import PropTypes from 'prop-types';
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';

const InterviewerList = function (props) {
  const listInterviewer = props.interviewers.map((interviewerItem) => {
    return (
      <InterviewerListItem
        key = {interviewerItem.id}
        name = {interviewerItem.name}
        avatar = {interviewerItem.avatar}
        selected = {interviewerItem.id === props.value}
        setInterviewer = {() => props.onChange(interviewerItem.id)}
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;