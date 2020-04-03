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
const jwt = require("jsonwebtoken");

const user = "testuser@northwestern.edu";
const token = jwt.sign(user, Cypress.env("DC_API_SECRET"));

/**
 * Helper command which sets the cookie and localStorage values
 * indicating an authenticated user
 */
Cypress.Commands.add("setSSOToken", () => {
  cy.setCookie("dcApiToken", token);
  cy.setCookie("dcApiUser", user);
  window.localStorage.setItem(loginKey, "true");
});

Cypress.Commands.add("getLinkIncludesPath", partialRoute => {
  cy.get("a")
    .should("have.attr", "href")
    .and("include", partialRoute);
});

Cypress.Commands.add("getByTestId", testId => {
  cy.get(`[data-testid=${testId}]`);
});
