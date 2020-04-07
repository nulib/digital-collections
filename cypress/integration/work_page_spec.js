/// <reference types="cypress" />

const singleFilesetRoute = "/items/0ea41d0d-ad48-4331-9a87-8a55836fb7ca";
const multipleFilesetRoute = "/items/0620eaca-54e6-4181-a858-39ddea0bb1c5";

describe("Work page", () => {
  context("OpenSeadragon single fileset work", () => {
    beforeEach(() => {
      cy.visit(singleFilesetRoute);
    });

    it("should display OpenSeadragon viewer and its controls", () => {
      cy.get(".landing-page").within($landingPage => {
        cy.get("[data-testid=section-open-seadragon]");
        cy.get(".openseadragon-canvas");
        cy.get("#zoom-in");
        cy.get("#zoom-out");
        cy.get("#full-page");

        // Single file set work doesn't show dropdown selector or thumbnails
        cy.getByTestId("react-select-wrapper").should("not.exist");
        cy.getByTestId("open-seadragon-thumbnails-container").should(
          "not.exist"
        );
      });
    });

    it("should display disabled OpenSeadraon navigation controls", () => {
      cy.get("#previous").should("have.attr", "disabled");
      cy.get("#next").should("have.attr", "disabled");
    });
  });

  context("OpenSeadragon multiple fileset work", () => {
    it("should display OpenSeadragon viewer plus fileset dropdown and thumbnails", () => {
      cy.visit(multipleFilesetRoute);

      cy.get("#previous").should("not.have.attr", "disabled");
      cy.get("#next").should("not.have.attr", "disabled");

      cy.getByTestId("react-select-wrapper").should("exist");
      cy.getByTestId("open-seadragon-thumbnails-container").should("exist");
    });
  });

  context("Item Details section", () => {
    beforeEach(() => {
      cy.visit(singleFilesetRoute);
    });

    it("should display title and description", () => {
      cy.getByTestId("section-item-details").within($itemDetails => {
        cy.get("h3").should("have.text", "Item Details");
        cy.get("[data-testid=item-title]");
        cy.get("[data-testid=item-description]");
      });
    });

    it("should display buttons which scroll down to metadata section", () => {
      cy.getByTestId("item-cite");
      cy.getByTestId("item-more-details").click();

      // Set a wait time equal to code's animation duration (1 second)
      cy.wait(1000);

      cy.window().then($window => {
        expect($window.scrollY).to.be.greaterThan(1000);
      });
    });

    it("should display Item Metadata section", () => {
      cy.getByTestId("item-summary");
      cy.getByTestId("identifier").contains(
        "0ea41d0d-ad48-4331-9a87-8a55836fb7ca"
      );
    });

    it("should display social links", () => {
      cy.getByTestId("social-links").within($socialLinks => {
        cy.get("button[aria-label=facebook]");
        cy.get("button[aria-label=twitter]");
        cy.get("button[aria-label=pinterest]");
      });
    });

    it("should display IIIF logo and link to IIIF manifest", () => {
      cy.getByTestId("iiif-draggable")
        .as("iiifDraggable")
        .should("have.attr", "href")
        .and(
          "include",
          "https://iiif.stack.rdc.library.northwestern.edu/public/0e/a4/1d/0d/-a/d4/8-/43/31/-9/a8/7-/8a/55/83/6f/b7/ca-manifest.json?"
        );
      cy.get("@iiifDraggable").find("img");
    });
  });

  context("Library Department section", () => {
    beforeEach(() => {
      cy.visit(singleFilesetRoute);
    });

    it("should display Library Department titles", () => {
      cy.getByTestId("section-library-department").within($section => {
        cy.contains("Library Department");
        cy.contains("Charles Deering McCormick Library of Special Collections");
      });
    });

    it("should display a button that links to the Search screen and filters on current Library Department", () => {
      cy.getByTestId("section-library-department")
        .contains("View All Items in Library Department")
        .click();

      // Now on the Search page
      cy.location("pathname").should("include", "search");
      cy.contains(
        "LibraryDepartment: Charles Deering McCormick Library of Special Collections"
      );
    });

    it("should display photo grid of Library Department items", () => {
      cy.getByTestId("section-library-department")
        .find("[data-testid=photo-grid]")
        .within($photoGrid => {
          cy.get("article").as("article");
          cy.get("@article").should("have.length.greaterThan", 1);
          cy.get("@article")
            .find("a")
            .should("have.attr", "href")
            .and("include", "/items/");
          cy.get("@article").find("[data-testid=img-photo-box]");
        });
    });
  });

  context("Collection section", () => {
    beforeEach(() => {
      cy.visit(singleFilesetRoute);
    });

    it("should display the Collection titles", () => {
      cy.getByTestId("section-collection").within($section => {
        cy.contains("Collection");
        cy.contains("Berkeley Folk Music Festival");
      });
    });

    it("should display a button link to all items in Collection", () => {
      cy.get("[data-testid=section-collection] a.button").as("button");

      cy.get("@button")
        .contains("View All Items in Collection")
        .should("have.attr", "href")
        .and("include", "/collections/");

      cy.get("@button").click();

      // Now on the Collections page
      cy.location("pathname").should("include", "collections");
      cy.contains("h2", "Berkeley Folk Music Festival");
    });

    it("should display photo grid of Collection items", () => {
      cy.getByTestId("section-collection")
        .find("[data-testid=photo-grid] article")
        .should("have.length.greaterThan", 1);
    });
  });

  it("should display This Item section", () => {
    cy.visit(singleFilesetRoute);
    cy.getByTestId("this-item").within($thisItem => {
      cy.contains("This item");
      cy.get("img");
    });
  });

  context("Tabs metadata section", () => {
    beforeEach(() => {
      cy.visit(singleFilesetRoute);
    });

    it("should display About, Find, and Cite tabs and they should show different content", () => {
      cy.get("[data-testid=section-tabs-metadata] ul#tabs").within($tabs => {
        cy.contains("About this Item");
        cy.contains("Find this Item");
        cy.contains("Cite this Item");
      });
    });

    it("should display different tab content when clicking on tabs", () => {
      // About tab content should appear by default
      cy.getByTestId("tab-content-metadata").as("tabContentMetadata");
      cy.getByTestId("tab-content-find")
        .as("tabContentFind")
        .should("not.exist");
      cy.getByTestId("tab-content-cite")
        .as("tabContentCite")
        .should("not.exist");

      cy.contains("Find this Item").click();
      cy.get("@tabContentMetadata").should("not.exist");
      cy.get("@tabContentFind");

      cy.contains("Cite this Item").click();
      cy.get("@tabContentFind").should("not.exist");
      cy.get("@tabContentCite");
    });

    context("About tab", () => {
      it("should display key metadata items and display links for metadata items which are facet-able", () => {
        cy.getByTestId("tab-content-metadata").within($tabContent => {
          cy.contains("Contributor");
          cy.contains("Olivier, Barry, 1935- (Photographer)")
            .should("have.attr", "href")
            .and(
              "include",
              "search?Contributor=%5B%22Olivier,+Barry,+1935-+(Photographer)%22%5D"
            );

          cy.contains("Date");
          cy.contains("Department");
          cy.contains(
            "Charles Deering McCormick Library of Special Collections"
          )
            .should("have.attr", "href")
            .and(
              "include",
              "search?LibraryDepartment=%5B%22Charles+Deering+McCormick+Library+of+Special+Collections%22%5D"
            );

          cy.contains("Title");
          cy.contains("Cat");
        });
      });

      it("should display links for metadata items which are facet-able", () => {
        cy.getByTestId("tab-content-metadata").within($tabContent => {
          cy.contains("a", "Olivier, Barry, 1935- (Photographer)");
          cy.contains(
            "a",
            "Charles Deering McCormick Library of Special Collections"
          );
          cy.contains("a", "black-and-white negatives");
          cy.contains("a", "In Copyright");
          cy.contains(
            "a",
            "Berkeley Folk Music Festival -- 1. Artists' Photo Archive"
          );
          cy.contains("a", `Berkeley (Calif.)`);
          cy.contains("a", "Floating Lotus Magic Opera Company");
        });
      });
    });

    context("Find tab", () => {
      it("should display key metadata items and display links for metadata items which are facet-able", () => {
        cy.contains("Find this Item").click();
        cy.getByTestId("tab-content-find").within($tabContent => {
          cy.contains("Box Number");
          cy.contains("a", "4")
            .should("have.attr", "href")
            .and(
              "include",
              "search?Box=%5B%224%22%5D&Collection=%5B%22Berkeley+Folk+Music+Festival%22%5D"
            );

          cy.contains("Accession");
          cy.contains("Folder Number");
          cy.contains("a", "1")
            .should("have.attr", "href")
            .and(
              "include",
              "search?Folder=%5B%221%22%5D&Box=%5B%224%22%5D&Collection=%5B%22Berkeley+Folk+Music+Festival%22%5D"
            );

          cy.contains("More Information");
          cy.contains(
            "For more information on this item or collection, please contact ude.nretsewhtron@snoitcelloc.laiceps"
          );
        });
      });
    });

    context("Cite tab", () => {
      it("should display key cite metadata items", () => {
        cy.contains("Cite this Item").click();
        cy.getByTestId("tab-content-cite").within($tabContent => {
          cy.contains("Identifier");
          cy.contains("MS 63");
          cy.contains("Title");
          cy.contains("Cat");

          cy.contains("APA Format");
          cy.contains("Chicago/Turabian Format");
          cy.contains("MLA Format");
          cy.contains("Wikipedia Citation");
        });
      });
    });
  });

  context("Authenticated content", () => {
    const authenticatedRoute = "/items/27113f17-0175-44a3-82f0-cde1e4865601";

    it("displays authenticated Work content when logged in", () => {
      cy.setSSOToken();
      cy.visitRouteLoggedIn(authenticatedRoute);
      cy.contains("h3", "Item Details");
    });

    it("redirects an authenticated Work screen when not logged in as authenticated user", () => {
      cy.visit(authenticatedRoute);
      cy.contains("Item Details").should("not.exist");
      cy.getByTestId("error-section").contains("Authorized access only");
    });
  });
});
