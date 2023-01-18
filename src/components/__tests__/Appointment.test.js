import React from "react";
import { render } from "@testing-library/react";
import Appointment from "../Appointment/index";


const state = {
      key: 3,
      id: 3,
      time:"2pm",
      interview: { student: "Archie Cohen", interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      } },
};

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("renders empty component (with show button) when no appointment exists", () => {
    const { getByAltText } = render(<Appointment />);
    const add_button = getByAltText('Add');
    expect(add_button).toBeInTheDocument();
  });

  it("renders show component when appointments data exist", () => {
    const { getByText } = render(<Appointment {...state} />);
    const interviewer = getByText('Interviewer');
    expect(interviewer).toBeInTheDocument();
  });
  it("renders the correct student name being passed", () => {
    const { getByText } = render(<Appointment {...state} />);
    const student = getByText('Archie Cohen');
    expect(student).toBeInTheDocument();
  });
  it("renders the correct interviewer name being passed", () => {
    const { getByText } = render(<Appointment {...state} />);
    const student = getByText('Tori Malcolm');
    expect(student).toBeInTheDocument();
  });
});