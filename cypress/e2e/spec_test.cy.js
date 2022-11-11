// var nock = require("nock");
// var spotifyApi = nock("https://api.spotify.com");

describe('Landing on localhost', () => {
  it('passes', () => {
    Cypress.config();

    // spotifyApi.get("/v1/me/playlists/")
    //   .reply(200, {
    //     title: "kastootab",
    //   });

    cy.visit('http://localhost:8888/');
    cy.wait(1000);
    cy.get('a').click();

    //log into spotify
    cy.origin('accounts.spotify.com', () => {
      cy.wait(1000);
      cy.get('input#login-username').click().type(Cypress.env('spotify-username'));
      cy.wait(1000);
      cy.get('input#login-password').click().type(Cypress.env('spotify-password'));
      cy.wait(1000);
      cy.get('#login-button').click();
      cy.wait(2000);
    });

    //Check if there is an existing playlist
    cy.get('#tableOutput').find("tr")
    cy.wait(3000);

    //create first playlist
    cy.window().then((win) => {
      cy.get('button#create-playlist').click();
      cy.stub(win, 'prompt').returns('Np');
      cy.wait(1000);
    })
    cy.get('#000').contains('Np');
    cy.wait(2500);

    //update
    cy.window().then((win) => {
      cy.get('button#00').click();
      cy.stub(win, 'prompt').returns('Upd');
      cy.wait(1000);
    })
    cy.get('#000').contains('Upd');
    cy.wait(2500);

    //delete
    cy.get('button#0').click();
    cy.wait(1000);
    cy.get('#000').should('not.contain', 'Upd');
  });
});