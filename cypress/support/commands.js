// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/*************************************************
 * Digital Collections code starts below this line
 */

import { loginKey } from "../../src/services/nul-api";
import { ELASTICSEARCH_PROXY_BASE } from "../../src/services/global-vars";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ0ZXN0dXNlciIsIm1haWwiOiJ0ZXN0dXNlckBub3J0aHdlc3Rlcm4uZWR1IiwiaWF0IjoxNTg1MjQ4MzcxfQ.cdQAXYjc_rhcdIthS3m082Plxsep814l0W1LYt96MBo";

/**
 * Helper command which sets the cookie and localStorage values
 * indicating an authenticated user
 */
Cypress.Commands.add("setSSOToken", () => {
  cy.setCookie("openAMssoToken", token);
  window.localStorage.setItem(loginKey, "true");
});

/**
 * Helper command which mocks a SSO user authentication request response
 * @param {string} route ie "/search" or "/collection/abc123"
 */
Cypress.Commands.add("visitRouteLoggedIn", route => {
  const response = {
    token: `${token}`,
    user: {
      uid: "testuser",
      mail: "testuser@northwestern.edu"
    }
  };

  cy.server();
  cy.route(
    `${Cypress.env("ELASTICSEARCH_PROXY_BASE") ||
      ELASTICSEARCH_PROXY_BASE}/auth/callback`,
    response
  ).as("getToken");

  cy.visit(route);
  cy.wait("@getToken");
});

Cypress.Commands.add("getLinkIncludesPath", partialRoute => {
  cy.get("a")
    .should("have.attr", "href")
    .and("include", partialRoute);
});

Cypress.Commands.add("getByTestId", testId => {
  cy.get(`[data-testid=${testId}]`);
});
