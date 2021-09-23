/// <reference types="cypress" />

//const jwt = require("jsonwebtoken");

describe("Search page", () => {
  context("Anonymous user", () => {
    beforeEach(() => {
      cy.visit("/search");
    });
    it("displays only public works in search results", () => {
      cy.getByTestId("button-filter-toggle").click();
      cy.contains("Visibility", { timeout: 15000 })
        .next("ul.rs-facet-list")
        .as("facetList");

      cy.get("@facetList").within(() => {
        cy.contains("Public");
        cy.contains("Institution").should("not.exist");
      });
    });

    it("should display breadcrumbs", () => {
      cy.getByTestId("breadcrumbs").within(($breadcrumbs) => {
        cy.contains("Home").should("have.attr", "href").and("include", "/");
        cy.contains("Search Results");
      });
    });

    it("should display screen title, search box, and results found text", () => {
      cy.get("main").within(($main) => {
        cy.contains("h2", "Search Results");
        cy.get("input.rs-search-input");
        cy.get(".rs-results-info").contains("results found in");
      });
    });

    it("should toggle filters/facets on/off", () => {
      cy.getByTestId("button-filter-toggle").as("toggleButton");
      cy.getByTestId("facets-sidebar")
        .as("facetsSidebar")
        .should("not.be.visible");
      cy.get("@toggleButton").click();
      cy.get("@toggleButton").should("contain.text", "Hide Filters");
      cy.get("@facetsSidebar").within(() => {
        cy.contains("h2", "Creator/Contributor");
        cy.contains("h2", "Subjects and Descriptive");
        cy.contains("h2", "Location");
        cy.contains("h2", "Rights and Usage");
      });
      cy.get("@toggleButton").click();
      cy.get("@facetsSidebar").should("not.be.visible");
    });

    it("should display search results grid", () => {
      cy.get(".rs-result-list.photo-grid").within(($grid) => {
        // Default page load results
        cy.get("article").should("have.length", 24);
        cy.getByTestId("photo-box").within(($photoBox) => {
          cy.getLinkIncludesPath("/items");
          cy.get("img");
          cy.getByTestId("title-photo-box").find("a").should("not.be.empty");
        });
      });
    });

    // TODO: This assertion passes locally but fails in Circle CI for some reason
    xit("should update content with in-page search", () => {
      const searchTerms = ["Berkeley", "Zanzibar"];

      cy.get("input.rs-search-input").as("searchBox").type(searchTerms[0]);

      cy.wait(5000); // Account for debounce setting
      cy.get(".rs-result-list article")
        .first()
        .as("firstResult")
        .contains(searchTerms[0]);

      cy.get("@searchBox").clear().type(searchTerms[1]);
      cy.wait(5000);
      cy.get("@firstResult").contains(searchTerms[1]);
    });

    context("Search results item", () => {
      it("should link to Item Details page", () => {
        cy.get(".rs-result-list.photo-grid").within(($grid) => {
          cy.get("article")
            .first()
            .find(" a")
            .then(($a) => {
              const txt = $a.text();
              cy.contains(txt).click();

              cy.location("pathname").should("include", "/items");
              cy.contains("h4", txt);
            });
        });
      });
    });

    context("Facet/filtering", () => {
      beforeEach(function () {
        cy.get(".rs-result-list article").first().invoke("text").as("txt");

        cy.get(".rs-results-info").invoke("text").as("resultsTxt");
      });

      // TODO: How much testing should we be doing to an external package (ReactiveSearch)?
      xit("should filter on an example facet", function () {
        // Apply a Collection filter (ex. WWII Poster Collection)
        cy.getByTestId("button-filter-toggle").click();
        cy.getByTestId("facets-sidebar").within(($sidebar) => {
          cy.contains("Collection").siblings().find("button").click();
          cy.get(".rs-facet-list")
            .contains("Rob Linrothe Image Collection")
            .click();
        });

        // TODO: FYI I don't like using these cy.wait(), as they're arbitrary to environments,
        // but until we get a test environment spun up, they work for now?
        cy.wait(6000);
        // Check for updates
        cy.get(".rs-result-list article")
          .first()
          .find("h4")
          .should("not.have.text", this.txt);
        cy.get(".rs-results-info").should("not.have.text", this.resultsTxt);

        // Clear the filter by clicking on the filter link
        cy.get(".rs-selected-filters a").first().click();
        cy.wait(6000);
        cy.get(".rs-result-list article")
          .first()
          .find("h4")
          .should("have.text", this.txt);
      });
    });

    it("should display search results from the Global search bar", function () {
      cy.visit("/about");
      cy.getByTestId("global-search-desktop-wrapper").within(
        ($searchWrapper) => {
          cy.get("input[type=text]").as("searchInput").type("Zanzibar");
          cy.get("button").as("searchButton").click();
        }
      );

      cy.location("pathname").should("include", "/search");
      cy.get(".rs-result-list article")
        .first()
        .as("article")
        .should("contain.text", "Zanzibar");

      // Do another search
      cy.get("@searchInput").clear().type("Jones");
      cy.get("@searchButton").click();

      cy.wait(3000);

      cy.get("@article").contains("Jones");
    });
  });

  context("Authenticated user", () => {
    beforeEach(() => {
      cy.setSSOToken();
    });

    it("displays public and authenticated works in search results", () => {
      cy.visit("/search");
      expect(localStorage.getItem("loggedIn")).not.null;
      expect(cy.getCookie("dcApiUser").should("exist"));
      expect(cy.getCookie("dcApiToken").should("exist"));

      cy.getByTestId("button-filter-toggle").click();
      cy.contains("Visibility", { timeout: 15000 })
        .next("ul.rs-facet-list")
        .as("facetList");

      cy.get("@facetList").within(($facetList) => {
        cy.contains("Institution");
        cy.contains("Public");
      });
    });
  });
});
