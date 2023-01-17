import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from "./Show"
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import useVisualMode from "../hooks/useVisualMode";
import Confirm from './Confirm';

const Appointment = function (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
  };
  const onDelete = function() {
    transition(CONFIRM);
  };
  const onConfirmToDelete= function() {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
  };
  console.log('props.interview',props.interview)
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM &&
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={()=>{transition(SHOW)}}
          onConfirm={onConfirmToDelete}
        />}
    </article>
  );
}

export default Appointment;
