/// <reference types="cypress" />

describe("Collections landing page", () => {
  beforeEach(() => {
    cy.visit("/collections");
  });

  it("displays the correct breadcrumb navigation", () => {
    cy.get("[data-testid=breadcrumbs").within(($breadcrumbs) => {
      cy.contains("Collections");
      cy.contains("All Collections");
    });
  });

  xit("displays page title and collection items", () => {
    cy.contains("h2", "All Collections");

    // Assuming we have at least 10 collections in production
    cy.get(".photo-grid > article").should("have.length.greaterThan", 10);

    cy.get(".photo-grid article")
      .should("have.class", "photo-box")
      .within(($article) => {
        cy.get("[data-testid=img-photo-box]");
        cy.get("[data-testid=title-photo-box]");
        cy.get("[data-testid=description-photo-box]");
        cy.get("a").should("have.attr", "href").and("contain", "/collections/");
      });
  });

  xit("filters Collections through the input filter", () => {
    cy.get("[data-testid=input-collection-filter]").as("inputFilter");
    cy.get(".photo-grid > article").as("articles");

    cy.get("@inputFilter").type("berkeley");
    cy.get("@articles").should("have.length", 1);

    cy.get("@inputFilter").clear();
    cy.get("@inputFilter").type("xyz");
    cy.get("@articles").should("have.length", 0);

    cy.get("@inputFilter").clear();
    cy.get("@articles").should("have.length.greaterThan", 10);
  });
});
