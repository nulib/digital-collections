/// <reference types="cypress" />
import { HOMEPAGE_COLLECTION_GROUP_KEYWORDS } from "../../src/services/global-vars";

describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays main hero section with an image, title, subtitle and link to collection", () => {
    cy.get("[data-testid=hero-home]").within(($hero) => {
      cy.get(".hero-image");
      cy.get("[data-testid=hero-title]");
      cy.get("[data-testid=hero-subtitle]");
      cy.get("[data-testid=hero-button-link]");
    });
  });

  xit("displays section: recently added and updated items, along with its photo grid", () => {
    cy.get("[data-testid=section-recent-items]").within(($section) => {
      cy.get("[data-testid=headline-photo-grid-section]");
      //cy.get("[data-testid=link-photo-grid-section]");
      cy.contains("View All Works");
      cy.get("[data-testid=photo-box]")
        .should("have.length", 8)
        .and("have.class", "photo-box");
    });

    cy.get("[data-testid=photo-box]").within(($photoBox) => {
      cy.get("a > img");
      cy.get("[data-testid=title-photo-box]").should("contain", "a");
    });
  });

  xit("displays section: featured collections section, along with its photo grid", () => {
    cy.get("[data-testid=section-featured-collections]").within(($section) => {
      cy.get("[data-testid=headline-photo-feature-section]");
      cy.contains("View All Collections");
      cy.get("[data-testid=photo-feature]")
        .and("have.class", "photo-feature")
        .its("length")
        .should("be.gt", 2);
    });

    cy.get("[data-testid=photo-feature]").within(($photoFeature) => {
      cy.get("[data-testid=front-photo-box]")
        .should("contain", "p")
        .and("have.class", "text-over-image");
      cy.get("[data-testid=back-photo-box]")
        .should("contain", "p")
        .and("have.class", "back-text");
    });
  });

  xit("renders additional Collection galleries", () => {
    cy.getByTestId("section-additional-collection-gallery")
      .its("length")
      .should("be.eq", 3);

    for (let keyword of HOMEPAGE_COLLECTION_GROUP_KEYWORDS) {
      cy.contains(`${keyword} Collections`);
    }
  });
});
