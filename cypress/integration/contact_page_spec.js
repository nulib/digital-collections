/// <reference types="cypress" />

describe("Contact us page", () => {
  beforeEach(() => {
    cy.visit("/contact-us");
  });

  it("displays correct breadcrumb navigation", () => {
    cy.get("[data-testid=breadcrumbs]").within($breadcrumbs => {
      cy.contains("Home");
      cy.contains("Contact Us");
    });
  });

  it("displays contact summary paragraphs", () => {
    cy.get("[data-testid=location-text]");
    cy.get("[data-testid=questions-text]");
    cy.get("[data-testid=content-text]").within($contenttext => {
      cy.get("a")
        .contains("Research Support")
        .should("have.attr", "href");
    });
  });
});
