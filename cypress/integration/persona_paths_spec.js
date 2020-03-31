/// <reference types="cypress" />

describe("Persona paths", () => {
  context("Anonymous user", () => {
    context("Legacy pid url", () => {
      const legacyPidRoute =
        "/legacy-pid/inu:dil-c9c1ab35-8cfe-433e-91f4-a4749367216b";

      it("redirects to the Digital Collections Work screen given a valid Legacy Pid value", () => {
        cy.visit(legacyPidRoute);
        cy.location("pathname").should("include", "/items");
      });

      it("redirects to the Home screen given an invalid Legacy Pid value", () => {
        cy.visit("/legacy-pid/ABC123");
        cy.location("pathname").should("be", "/");
      });
    });
  });
});
