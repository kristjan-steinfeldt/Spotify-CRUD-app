describe('Landing on localhost', () => {
  it('passes', () => {
    Cypress.config();

    cy.visit('http://localhost:8888/');
    cy.get('a').click();

    //log into spotify
    cy.origin('accounts.spotify.com', () => {
      cy.get('input#login-username').click().type(Cypress.env('spotify-username'));
      cy.get('input#login-password').click().type(Cypress.env('spotify-password'));
      cy.get('#login-button').click();
    });

    //Check if there is an existing playlist
    cy.get('#tableOutput').find("tr")

    //create first playlist
    cy.window().then((win) => {
      cy.get('button#create-playlist').click();
      cy.stub(win, 'prompt').returns('Np');
    })
    cy.get('#000')
      .should('contain', 'Np')

    //update
    cy.window().then((win) => {
      cy.get('button#00').click();
      cy.stub(win, 'prompt').returns('Upd');

      // cy.wait(1000);
    })
    cy.get('#000')
      .should('contain', 'Upd')

    //delete
    cy.get('button#0').click();
    cy.get('#000')
      .should('not.contain', 'Upd');
  });
});