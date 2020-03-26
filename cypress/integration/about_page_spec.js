/// <reference types="cypress" />

describe("About page", () => {
  beforeEach(() => {
    cy.visit("/about");
  });

  it("displays main hero section with an image, title and subtitle", () => {
    cy.get("[data-testid=hero-section]").within($hero => {
      cy.get(".hero-image");
      cy.get("[data-testid=hero-title]").contains(
        "Repository and Digital Curation"
      );
      cy.get("[data-testid=hero-subtitle]").contains(
        "Digitizing Our Distinctive Collections"
      );
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
      cy.get("p").contains(
        "Digital Collections contains thousands of items from Northwestern University Libraries."
      );
    });
  });

  it("displays section: collection highlights along with photo grid to display work", () => {
    cy.get("[data-testid=collection-highlights-section]");
    cy.contains("h3", "Collection Highlights");
    cy.get("[data-testid=feature-two-col1]").as("feature-two-col1");
    cy.get("[data-testid=feature-two-col2]").as("feature-two-col2");
    cy.get("[data-testid=feature-two-col3]").as("feature-two-col3");
    cy.get("@feature-two-col1")
      .find(".feature-box")
      .first()
      .as("feature-box1");
    cy.get("@feature-two-col1")
      .find(".feature-box")
      .eq(1)
      .as("feature-box2");

    cy.get("@feature-two-col2")
      .find(".feature-box")
      .first()
      .as("feature-box3");
    cy.get("@feature-two-col2")
      .find(".feature-box")
      .eq(1)
      .as("feature-box4");

    cy.get("@feature-two-col3")
      .find(".feature-box")
      .first()
      .as("feature-box5");
    cy.get("@feature-two-col3")
      .find(".feature-box")
      .eq(1)
      .as("feature-box6");

    cy.get("@feature-box1").within($featurebox1 => {
      cy.get("img");
      cy.contains("h4", "Hamid Naficy Iranian Movie Posters Collection");
      cy.get("p");
      cy.get("a")
        .contains("View Work")
        .should("have.attr", "href")
        .and("include", "/collections/");
    });
    cy.get("@feature-box2").within($featurebox2 => {
      cy.get("img");
      cy.contains("h4", "Vernon McKay Photographs");
      cy.get("p");
      cy.get("a")
        .contains("View Work")
        .should("have.attr", "href")
        .and("include", "/collections/");
    });
    cy.get("@feature-box3").within($featurebox3 => {
      cy.contains("h4", "Records of the Bursar’s Office Takeover, May 1968");
    });
    cy.get("@feature-box4").within($featurebox4 => {
      cy.contains(
        "h4",
        "World War II Poster Collection at Northwestern University Library"
      );
    });
    cy.get("@feature-box5").within($featurebox5 => {
      cy.contains("h4", "Ramón Casas sketchbooks");
    });
    cy.get("@feature-box6").within($featurebox6 => {
      cy.contains(
        "h4",
        "Kate and Lou. Souvenir of auto trip to San Francisco, 1915"
      );
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
    });
  });
});
