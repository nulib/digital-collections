/// <reference types="cypress" />

describe("About page", () => {
  beforeEach(() => {
    cy.visit("/about");
  });

  it("displays main hero section with an image, title and subtitle", () => {
    cy.get("[data-testid=hero-section]").within($hero => {
      cy.get(".hero-image");
      cy.get("[data-testid=hero-title]");
      cy.get("[data-testid=hero-subtitle]");
    });
  });

  it("displays correct breadcrumb navigation", () => {
    cy.get("[data-testid=breadcrumbs]").within($breadcrumbs => {
      cy.contains("Home");
      cy.contains("About");
    });
  });

  it("displays section: collection summary", () => {
    cy.get("[data-testid=section-collection-summary]").within($section => {
      cy.get("p");
    });
  });

  it("displays section: collection highlights along with photo grid to display work", () => {
    cy.get("[data-testid=collection-highlights-section]");
    cy.contains("h3", "Collection Highlights");
    cy.get("[data-testid=feature-two-col1]");
    cy.get("[data-testid=feature-two-col2]");
    cy.get("[data-testid=feature-two-col3]");
    cy.get(
      "[data-testid=feature-box-4ed2338d-c715-4a86-8ac6-6b4030a42be5]"
    ).within($featurebox1 => {
      cy.get("img");
      cy.contains("h4", "Hamid Naficy Iranian Movie Posters Collection");
      cy.get("p");
      cy.get("a")
        .contains("View Work")
        .should("have.attr", "href");
    });
    cy.get(
      "[data-testid=feature-box-1d849df1-eb32-43f4-b7b9-e435cff18f7c]"
    ).within($featurebox2 => {
      cy.get("img");
      cy.contains("h4", "Vernon McKay Photographs");
      cy.get("p");
      cy.get("a")
        .contains("View Work")
        .should("have.attr", "href");
    });
    cy.get(
      "[data-testid=feature-box-c2a8a3e0-af0f-4e04-8721-91698fc14574]"
    ).within($featurebox3 => {
      cy.get("img");
      cy.contains("h4", "Records of the Bursar’s Office Takeover, May 1968");
      cy.get("p");
      cy.get("a")
        .contains("View Work")
        .should("have.attr", "href");
    });
    cy.get(
      "[data-testid=feature-box-c708f479-db91-4585-8267-874c5e7da73f]"
    ).within($featurebox4 => {
      cy.get("img");
      cy.contains(
        "h4",
        "World War II Poster Collection at Northwestern University Library"
      );
      cy.get("p");
      cy.get("a")
        .contains("View Work")
        .should("have.attr", "href");
    });
    cy.get(
      "[data-testid=feature-box-ba35820a-525a-4cfa-8f23-4891c9f798c4]"
    ).within($featurebox5 => {
      cy.get("img");
      cy.contains("h4", "Ramón Casas sketchbooks");
      cy.get("p");
      cy.get("a")
        .contains("View Work")
        .should("have.attr", "href");
    });
    cy.get(
      "[data-testid=feature-box-81061b51-1ed0-4495-bf37-30d46f35c63b]"
    ).within($featurebox6 => {
      cy.get("img");
      cy.contains(
        "h4",
        "Kate and Lou. Souvenir of auto trip to San Francisco, 1915"
      );
      cy.get("p");
      cy.get("a")
        .contains("View Work")
        .should("have.attr", "href");
    });
  });

  it("displays section: collection usage with rights and IIIF support statement", () => {
    cy.get("[data-testid=collections-usage-section]").within($section => {
      cy.contains("h3", "Using the collections");
      cy.get("[data-testid=rights-statement-article]").contains(
        "h4",
        "Rights Statement"
      );
      cy.get("[data-testid=rights-statement-text]");
      cy.get("[data-testid=IIIF-article]").contains(
        "h4",
        "International Image Interoperability Framework (IIIF)"
      );
      cy.get("[data-testid=IIIF-text]");
    });
  });

  it("displays section: platform with s list of dev tools ", () => {
    cy.get("[data-testid=platform-section]").within($section => {
      cy.contains("h3", "Platform");
      cy.contains("h4", "Development Tools");
      cy.get("li")
        .siblings()
        .should("have.length", 4);
    });
  });
});
