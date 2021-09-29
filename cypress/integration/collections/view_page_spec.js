/// <reference types="cypress" />

describe("Collections View page", () => {
  context("Anonymous user", () => {
    beforeEach(() => {
      cy.visit("/collections/1c2e2200-c12d-4c7f-8b87-a935c349898a");
    });
    it("should display breadcrumbs", () => {
      cy.getByTestId("breadcrumbs").within(($breadcrumbs) => {
        cy.contains("Collections")
          .should("have.attr", "href")
          .and("include", "/collections");
        cy.contains("16th-Early 20th Century Maps of Africa");
      });
    });

    it("should display screen title, search box", () => {
      cy.get("main").within(($main) => {
        cy.contains("h2", "16th-Early 20th Century Maps of Africa");
        cy.get("input.searchbox");
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

    it("should display description", () => {
      cy.getByTestId("collection-description").within(($sidebar) => {
        cy.contains("p", "113 antique maps of Africa");
      });
    });

    it("displays only public works in search results", () => {
      cy.getByTestId("button-filter-toggle").click();
      cy.contains("Visibility", { timeout: 15000 })
        .next("ul.rs-facet-list")
        .as("facetList");

      cy.get("@facetList").within(($facetList) => {
        cy.contains("Public");
        cy.contains("Institution").should("not.exist");
      });
    });

    it("should display collection items grid", () => {
      cy.get(".rs-result-list.photo-grid").within(($grid) => {
        cy.getByTestId("photo-box").within(($photoBox) => {
          cy.getLinkIncludesPath("/items");
          cy.get("img");
          cy.getByTestId("title-photo-box").find("a").should("not.be.empty");
        });
      });
    });

    xit("should update content with search within collection", () => {
      const searchTerms = ["kingdoms", "Guinea"];

      cy.get("input.rs-search-input").as("searchBox").type(searchTerms[0]);
      cy.wait(3000); // Account for debounce setting
      cy.get(".rs-result-list article")
        .first()
        .as("firstResult")
        .contains(searchTerms[0]);

      cy.get("@searchBox").clear().type(searchTerms[1]);
      cy.wait(3000);
      cy.get("@firstResult").contains(searchTerms[1]);
    });

    it("should open Item Details page from collections grid", () => {
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

    it("should display URL params pagination", () => {
      cy.get(".rs-pagination");
      cy.get(".rs-pagination > a").eq(3).click();
      // Open page 5 of results
      cy.location("search").should("include", "?collection-items-results=3");

      cy.get(".rs-pagination > a.active")
        .invoke("attr", "alt")
        .should("contain", "Page 3");

      // Visit an item detail page
      cy.visit("/items/acec9f18-a2aa-424c-b0b8-fcaaaf579ba0", {
        timeout: 3000,
      });
      // Go back through browsers history and expect to get to page 5 of results.
      cy.go("back");
      cy.location("search").should("include", "?collection-items-results=3");
    });

    context("Facet/filtering", () => {
      beforeEach(function () {
        //Get the first result;
        cy.get(".rs-result-list article").first().invoke("text").as("txt");
        //Get the number of search results text E.g., 113 results in 10 ms.
        cy.get(".rs-results-info").invoke("text").as("resultsTxt");
      });

      it("should filter on an example facet (based on Location)", function () {
        cy.getByTestId("button-filter-toggle").click();
        cy.getByTestId("facets-sidebar").within(($sidebar) => {
          cy.contains("Location")
            .siblings("ul")
            .contains("England--London")
            .click();
        });

        cy.wait(5000);
        // Check for updates
        cy.get(".rs-result-list article")
          .first()
          .find("h4")
          .should("not.have.text", this.txt);
        cy.get(".rs-results-info").should("not.have.text", this.resultsTxt);

        // Clear the filter by clicking on the filter link
        cy.get(".rs-selected-filters a").first().click();
        cy.wait(5000);
        cy.get(".rs-result-list article")
          .first()
          .find("h4")
          .should("have.text", this.txt);
      });
    });
  });

  context("Authenticated user", () => {
    const authenticatedRoute =
      "/collections/17a5d121-2bc2-4942-aa48-34ac86f3b83d";

    it("displays authenticated Work content when logged in", () => {
      cy.setSSOToken();
      cy.visit(authenticatedRoute);
      cy.contains("h2", "University Theatre Production Photographs");
    });
    it("redirects an authenticated Work screen when not logged in as authenticated user", () => {
      cy.visit(authenticatedRoute);
      cy.contains("Item Details").should("not.exist");
      cy.get("h2").contains("Page Not Found");
    });
  });
});
