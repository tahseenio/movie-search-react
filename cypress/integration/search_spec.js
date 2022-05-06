describe('User Experience Test 1', () => {
  it('User Can search a movie and search by pressing enter or clicking the search button', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[name="searchbar"]').click().type('batman{enter}')
    cy.wait(2000)
    cy.get('input[name="searchbar"]').clear()
    cy.get('input[name="searchbar"]').click().type('spiderman')
    cy.get('#root > div > main > header > div > div > div > span > svg').click()
  })
})


describe('User Experience Test 2', () => {
  it('User can click on a movie to get more information', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[name="searchbar"]').click().type('batman{enter}')
    cy.wait(2000)
    cy.findByRole('link', { name: /the batman rating: 7\.9/i }).click()
  })
})

describe('User Experience Test 3', () => {
  it('User can click and see results for popular, trending and top rated', () => {
    cy.visit('http://localhost:3000/');
    cy.findByText(/top rated/i).click()
    cy.wait(2000)
    cy.findByText(/trending/i).click()
    cy.wait(2000)
    cy.findByText(/popular/i).click()
    cy.wait(2000)
  })
})

describe('User Experience Test 4', () => {
  it('User can sort by lowest and highest rating', () => {
    cy.visit('http://localhost:3000/');
    cy.findByText(/top rated/i).click()
    cy.wait(2000)
    cy.findByRole('combobox').select(1)
    cy.wait(2000)
    cy.findByRole('combobox').select(2)
  })
})