describe("Validation tests", () => {
  it("should visit the page", () => {
    cy.visit("http://localhost:3000");
  });

  it("should display error message with code enter", () => {
    cy.visit("http://localhost:3000");
    cy.get("button[class=submit-button]").click();
    cy.get("div[class=errorSms]").should("contain", "Verification Error");
  });

  it("should display error message with invalid character enter", () => {
    cy.visit("http://localhost:3000");
    cy.get(".input-box").eq(0).type("d").should("have.class", "error");
  });

  it("should display error message with less than 6 character", () => {
    cy.visit("http://localhost:3000");

    cy.get(".input-box").eq(0).type(1);
    cy.get(".input-box").eq(1).type(2);
    cy.get(".input-box").eq(2).type(3);
    cy.get(".input-box").eq(3).type(2);
    cy.get(".input-box").eq(4).type(2);

    cy.get("button[class=submit-button]").click();
    cy.get("div[class=errorSms]").should("contain", "Verification Error");
  });

  it("should display error message if last digit is 7", () => {
    cy.visit("http://localhost:3000");

    cy.get(".input-box").eq(0).type(1);
    cy.get(".input-box").eq(1).type(2);
    cy.get(".input-box").eq(2).type(3);
    cy.get(".input-box").eq(3).type(2);
    cy.get(".input-box").eq(4).type(2);
    cy.get(".input-box").eq(5).type(7);

    cy.get("button[class=submit-button]").click();
    cy.get("div[class=errorSms]").should("contain", "Verification Error");
  });
});
