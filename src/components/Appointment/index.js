import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from "./Show"
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import useVisualMode from "../hooks/useVisualMode";
import Confirm from './Confirm';
import Error from './Error';

const Appointment = function (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  };

  const onConfirmToDelete = function () {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => { 
        transition(ERROR_DELETE, true) });
  };

  return (
    <article className="appointment"  data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty 
      onAdd={() => transition(CREATE)} 
      />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => { transition(CONFIRM) }}
          onEdit={() => { transition(EDIT) }}
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
          onCancel={back}
          onConfirm={onConfirmToDelete}
        />}
      {mode === EDIT && <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />}
      {mode === ERROR_SAVE && <Error
        message="Could not save appointment."
        onClose={back}
      />}
      {mode === ERROR_DELETE && <Error
        message="Could not delete appointment."
        onClose={back}
      />}
    </article>
  );
}

// Appointment.propTypes = {
//   interviewers: PropTypes.object.isRequired
// };

export default Appointment;
