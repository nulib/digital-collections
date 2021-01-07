/// <reference types="cypress" />

describe("Layout elements (header, footer, etc.)", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Header", () => {
    it("should display the top nav bar content", () => {
      // Set up an alias for repeated references
      cy.get("[data-testid=top-bar]").as("topBar");

      cy.get("[data-testid=northwestern-logo]");
      cy.get("[data-testid=accessible-northwestern-logo]");
      cy.get("@topBar").contains("library.northwestern.edu");
      cy.get("@topBar").contains("sign in", { matchCase: false });
    });

    it("should display quick links content", () => {
      cy.get("[data-testid=quick-links").as("quickLinks");
      cy.get("@quickLinks").contains("about", { matchCase: false });
      cy.get("@quickLinks").contains("contact us", { matchCase: false });
    });

    //TODO: Test logged in / out link display, mess with interacting with redux store through cypress window?

    it("should display bottom bar content", () => {
      cy.get("h1").contains("LIBRARIES | DIGITAL COLLECTIONS");
    });

    context("720p resolution", () => {
      beforeEach(function () {
        // run these tests as if in a desktop
        // browser with a 720p monitor
        cy.viewport(1280, 720);
      });

      it("should display desktop global search", () => {
        cy.get("[data-testid=global-search-desktop-wrapper]").as(
          "searchDesktop"
        );
        cy.get("h1").contains("LIBRARIES | DIGITAL COLLECTIONS");
        cy.get("@searchDesktop").find("form");
        cy.get("@searchDesktop").find("button");

        // Validate that global search entry goes to search page
        cy.get("@searchDesktop").find("input[type=text]").type("Foo{enter}");
        cy.location("pathname").should("include", "search");
      });

      xit("should not display mobile search", () => {
        // Validate mobile search not displayed
        cy.get("[data-testid=mobie-links").should("not.be.visible");
      });
    });

    context("iPhone 6 resolution", () => {
      beforeEach(() => {
        cy.viewport("iphone-6+");
      });

      it("should display mobile links and navigate around pages", () => {
        cy.get("[data-testid=global-search-desktop-wrapper").should(
          "not.be.visible"
        );

        // Toggle mobile nav
        cy.get("button.mobile-nav-link").click();
        cy.contains("Explore Collections");
        cy.contains("Browse Items");
        cy.contains("about", { matchCase: false });
        cy.contains("contact us", { matchCase: false });
        cy.contains("library.northwestern.edu", { matchCase: false });
        cy.contains("sign in", { matchCase: false });

        // Test navigation
        // About link
        cy.get("#mobile-nav-bottom-left > :nth-child(2) > a").click();
        cy.location("pathname").should("include", "contact-us");

        cy.get("button.mobile-nav-link").click();

        // Explore Collections
        cy.get('#mobile-nav > :nth-child(1) > [tabindex="0"] > a').click();
        cy.location("pathname").should("include", "collections");
      });

      it("should display a functional mobile-only search", () => {
        cy.get("button.mobile-search-link").click();

        // Regular mobile nav is hidden
        cy.get("[data-testid=mobile-nav]").should("not.be.visible");

        // Test search functionality
        cy.get("[data-testid=mobile-search-wrapper]")
          .find("form input[type=text]")
          .type("Beethoven{enter}");
        cy.location("pathname").should("include", "search");
      });
    });
  });

  describe("Footer", () => {
    it("displays footer and elements", () => {
      cy.get("footer").within(($footer) => {
        // you have access to the found form via
        // the jQuery object $form if you need it

        // cy.get() will only search for elements within footer,
        // not within the entire document

        // Check random footer elements to ensure they're displaying
        cy.get("img").should("have.attr", "alt", "Northwestern University");
        cy.contains("Contact Northwestern University");
        cy.contains("1970 Campus Drive");
        cy.contains("FAQs");
        cy.contains(
          "Northwestern University Libraries is dedicated to the fair and ethical preservation, digitization, curation, and use of its collections."
        );
      });
    });
  });
});
