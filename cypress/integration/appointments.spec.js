describe("Appointment", () => {
  beforeEach(() => {
    cy.request("GET", "http://localhost:8001/api/debug/reset")

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {

    //press the first add
    cy.get("[alt=Add]")
      .first()
      .click();

    //inputing name on form
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    //selecting an interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    //saving the form
    cy.contains("Save").click();

    //browser should contain the new appointment information
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an appointment", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });

    //changing name input
    cy.get("[data-testid=student-name-input]")
    .clear()
    .type("Lydia Miller-Jones");

    //selecting an interviewer
    cy.get("[alt='Tori Malcolm']").click();

    //saving the form
    cy.contains("Save").click();

    //browser should contain the new appointment information
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({ force: true });
  
    cy.contains("Confirm").click();
  
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
  
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
})