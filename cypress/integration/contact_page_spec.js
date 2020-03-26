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
    cy.get("p").contains("Northwestern University Libraries");
    cy.get("p").within($paragraph => {
      cy.get("a")
        .contains("Research Support")
        .should("have.attr", "href")
        .and("include", "/research/research-support/");
    });
  });
});
