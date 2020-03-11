/// <reference types="cypress" />

describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the top nav bar", () => {
    cy.get("#top-bar").contains("library.northwestern.edu");

    cy.get("#top-bar").contains("Sign in");
    cy.get("[data-testid=northwestern-logo]");
  });
});
