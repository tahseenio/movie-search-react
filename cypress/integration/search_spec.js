describe('user can successfully see top rated popular and trending movies', () => {
  it('user can successfully see top rated popular and trending movies', () => {
    // click any one of the buttons
    // see that it is loading movies
    cy.visit('http://localhost:3000/movie-search-react');
    cy.get('input[name="searchbar"]').click().type('batman{enter}')
    // cy.get('#root > div > main > header > div > div > div > span > svg').click()
    // cy.get('input[name="searchbar"]').click().type('spiderman')
    // cy.findByText(/top rated/i).click()
    // cy.wait(2000)
    // cy.findByRole('combobox').select(1)
    // cy.wait(2000)
    // cy.findByRole('combobox').select(2)
    // cy.findByText(/trending/i).click()
    // cy.wait(2000)
    // cy.findByText(/popular/i).click()
    // cy.wait(2000)
  })
})