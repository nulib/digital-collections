/// <reference types="cypress" />

describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays main hero section with an image, title, subtitle and link to collection", () => {
    cy.get("[data-testid=hero-home]").within($hero => {
      cy.get(".hero-image");
      cy.get("[data-testid=hero-title]");
      cy.get("[data-testid=hero-subtitle]");
      cy.get("[data-testid=hero-button-link]");
    });
  });

  it("displays section: recently added and updated items, along with its photo grid", () => {
    cy.get("[data-testid=section-recent-items]").within($section => {
      cy.get("[data-testid=headline-photo-grid-section]");
      //cy.get("[data-testid=link-photo-grid-section]");
      cy.contains("View All Items");
      cy.get("[data-testid=photo-box]")
        .should("have.length", 8)
        .and("have.class", "photo-box");
    });

    cy.get("[data-testid=photo-box]").within($photoBox => {
      cy.get("a > img");
      cy.get("[data-testid=title-photo-box]").should("contain", "a");
    });
  });

  it("displays section: featured collections section, along with its photo grid", () => {
    cy.get("[data-testid=section-featured-collections]").within($section => {
      cy.get("[data-testid=headline-photo-feature-section]");
      cy.contains("View All Collections");
      cy.get("[data-testid=photo-feature]")
        .and("have.class", "photo-feature")
        .its("length")
        .should("be.gt", 2);
    });

    cy.get("[data-testid=photo-feature]").within($photoFeature => {
      cy.get("[data-testid=front-photo-box]")
        .should("contain", "p")
        .and("have.class", "text-over-image");
      cy.get("[data-testid=back-photo-box]")
        .should("contain", "p")
        .and("have.class", "back-text");
    });
  });

  it("displays in-page hero section with an image, title, subtitle and link to the collection", () => {
    cy.get("[data-testid=hero-in-page]").within($hero => {
      cy.get("[data-testid=hero-in-page-title]");
      cy.get("[data-testid=hero-in-page-subtitle]");
      cy.get("[data-testid=hero-in-page-link]").should("have.length.gte", 1);
    });
  });
});
