/// <reference types="cypress" />

import { loginKey } from "../../src/services/nul-api";
import * as globalVars from "../../src/services/global-vars";

const jwt = require("jsonwebtoken");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ0ZXN0dXNlciIsIm1haWwiOiJ0ZXN0dXNlckBub3J0aHdlc3Rlcm4uZWR1IiwiaWF0IjoxNTg1MjMxMTQ4fQ.M96J0Nh8VH9zLWUKKSc8xulVfyqk457bgqNcFlVuZjw";

const response = {
  token: `${token}`,
  user: {
    uid: "testuser",
    mail: "testuser@northwestern.edu"
  }
};

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
      cy.setCookie("openAMssoToken", token);
      localStorage.setItem(loginKey, "true");
    });

    it("displays public and authenticated works in search results", () => {
      cy.server();
      cy.route(
        `${Cypress.env("ELASTICSEARCH_PROXY_BASE") ||
          globalVars.ELASTICSEARCH_PROXY_BASE}/auth/callback`,
        response
      ).as("getToken");
      cy.visit("/search");
      cy.wait("@getToken");

      console.log("localStorage getItem()", localStorage.getItem(loginKey));
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
