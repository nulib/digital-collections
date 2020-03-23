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
        cy.get("[data-testid=react-select-wrapper]").should("not.exist");
        cy.get("[data-testid=open-seadragon-thumbnails-container]").should(
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

      cy.get("[data-testid=react-select-wrapper]").should("exist");
      cy.get("[data-testid=open-seadragon-thumbnails-container]").should(
        "exist"
      );
    });
  });

  context("Item Details section", () => {
    beforeEach(() => {
      cy.visit(singleFilesetRoute);
    });

    it("should display title and description", () => {
      cy.get("[data-testid=section-item-details]").within($itemDetails => {
        cy.get("h3").should("have.text", "Item Details");
        cy.get("[data-testid=item-title]");
        cy.get("[data-testid=item-description]");
      });
    });

    it("should display buttons which scroll down to metadata section", () => {
      cy.get("[data-testid=item-cite]");
      cy.get("[data-testid=item-more-details]").click();

      // Set a wait time equal to code's animation duration (1 second)
      cy.wait(1000);

      cy.window().then($window => {
        expect($window.scrollY).to.be.greaterThan(1000);
      });
    });

    it("should display Item Metadata section", () => {
      cy.get("[data-testid=item-summary]");
      cy.get("[data-testid=identifier]").contains(
        "0ea41d0d-ad48-4331-9a87-8a55836fb7ca"
      );
    });

    it("should display social links", () => {
      cy.get("[data-testid=social-links]").within($socialLinks => {
        cy.get("button[aria-label=facebook]");
        cy.get("button[aria-label=twitter]");
        cy.get("button[aria-label=pinterest]");
      });
    });

    it("should display IIIF logo and link to IIIF manifest", () => {
      cy.get("[data-testid=iiif-draggable]")
        .should("have.attr", "href")
        .and(
          "include",
          "https://iiif.stack.rdc.library.northwestern.edu/public/0e/a4/1d/0d/-a/d4/8-/43/31/-9/a8/7-/8a/55/83/6f/b7/ca-manifest.json?"
        );
      cy.get("[data-testid=iiif-draggable]").find("img");
    });
  });

  context("Library Department section", () => {
    beforeEach(() => {
      cy.visit(singleFilesetRoute);
    });

    it("should display Library Department titles", () => {
      cy.get("[data-testid=section-library-department]").within($section => {
        cy.contains("Library Department");
        cy.contains("Charles Deering McCormick Library of Special Collections");
      });
    });

    it("should display a button link to all items in Library Department", () => {
      cy.get("[data-testid=section-library-department] a.button").contains(
        "View All Items in Library Department"
      );
    });

    it("should display photo grid of Library Department items", () => {
      cy.get("[data-testid=section-library-department]")
        .find("[data-testid=photo-grid] article")
        .should("have.length.greaterThan", 1);
    });
  });

  context("Collection section", () => {
    beforeEach(() => {
      cy.visit(singleFilesetRoute);
    });

    it("should display the Collection titles", () => {
      cy.get("[data-testid=section-collection]").within($section => {
        cy.contains("Collection");
        cy.contains("Berkeley Folk Music Festival");
      });
    });

    it("should display a button link to all items in Collection", () => {
      cy.get("[data-testid=section-collection] a.button").contains(
        "View All Items in Collection"
      );
    });

    it("should display photo grid of Collection items", () => {
      cy.get("[data-testid=section-collection]")
        .find("[data-testid=photo-grid] article")
        .should("have.length.greaterThan", 1);
    });
  });

  it("should display This Item section", () => {
    cy.visit(singleFilesetRoute);
    cy.get("[data-testid=this-item]").within($thisItem => {
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
      cy.get("[data-testid=tab-content-metadata]");
      cy.get("[data-testid=tab-content-find]").should("not.exist");
      cy.get("[data-testid=tab-content-cite]").should("not.exist");

      cy.contains("Find this Item").click();
      cy.get("[data-testid=tab-content-metadata]").should("not.exist");
      cy.get("[data-testid=tab-content-find]");

      cy.contains("Cite this Item").click();
      cy.get("[data-testid=tab-content-find]").should("not.exist");
      cy.get("[data-testid=tab-content-cite]");
    });

    context("About tab", () => {
      it("should display key metadata items and display links for metadata items which are facet-able", () => {
        cy.get("[data-testid=tab-content-metadata]").within($tabContent => {
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
    });

    context("Find tab", () => {
      it("should display key metadata items and display links for metadata items which are facet-able", () => {
        cy.contains("Find this Item").click();
        cy.get("[data-testid=tab-content-find]").within($tabContent => {
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
        cy.get("[data-testid=tab-content-cite]").within($tabContent => {
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
});
