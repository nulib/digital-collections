/// <reference types="cypress" />

import { loginKey } from "../../src/services/nul-api";

const cookieValue =
  "AQIC5wM2LY4Sfcy2VAYURJEcwkgRvbcrSVKhZGKqM_fkGFI.*AAJTSQACMDYAAlNLABMxNzk3MTIyOTA2Mzg2NDc3NzE4AAJTMQACMDM.*";

describe("Search page", () => {
  context("Anonymous user", () => {
    beforeEach(() => {
      cy.visit("/search");
    });
    it("displays only public works in search results", () => {
      cy.get("[data-testid=button-filter-toggle]").click();
      cy.contains("Visibility", { timeout: 15000 })
        .siblings()
        .find("button")
        .click()
        .get("ul.rs-facet-list")
        .as("facetList");

      cy.get("@facetList").within($facetList => {
        cy.contains("open");
        cy.contains("authenticated").should("not.exist");
      });
    });
  });

  context("Authenticated user", () => {
    beforeEach(() => {
      cy.setCookie("openAMssoToken", cookieValue);
      localStorage.setItem(loginKey, "true");
      cy.visit("/search");
    });

    it("displays only public works in search results", () => {
      //console.log("localStorage getItem()", localStorage.getItem(loginKey));
      cy.get("[data-testid=button-filter-toggle]").click();
      cy.contains("Visibility", { timeout: 15000 })
        .siblings()
        .find("button")
        .click()
        .get("ul.rs-facet-list")
        .as("facetList");

      cy.get("@facetList").within($facetList => {
        cy.contains("open");
        cy.contains("authenticated");
      });
    });
  });
});
