describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST','http://localhost:3001/api/users',
      ({ username: 'testijäbä', name:'testaaja', password:'salasana' }) )
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testijäbä')
      cy.get('#password').type('salasana')
      cy.contains('Login').click()
      cy.contains('testaaja logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('fail')
      cy.get('#password').type('salasana')
      cy.contains('Login').click()
      cy.contains('wrong')
    })

    it('A blog can be deleted', function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.request('POST','http://localhost:3001/api/users',
        ({ username: 'testijäbä', name:'testaaja', password:'salasana' }) )
      cy.visit('http://localhost:3000')
      cy.request('POST','http://localhost:3001/api/login', {
        username: 'testijäbä', password:'salasana'
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')})
      cy.contains('Create').click()
      cy.get('#title').type('testi')
      cy.get('#author').type('testi')
      cy.get('#url').type('testi')
      cy.get('#create').click()
      cy.get('#view').click()
      cy.contains('Delete').click()
      cy.get('html').should('not.contain', 'testi')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testijäbä')
      cy.get('#password').type('salasana')
      cy.contains('Login').click()
    })

    it('A blog can be created', function() {
      cy.contains('Create').click()
      cy.get('#title').type('testi')
      cy.get('#author').type('testi')
      cy.get('#url').type('testi')
      cy.get('#create').click()
      cy.contains('A new blog: testi by testi added')
    })

    it('A blog can be voted', function() {
      cy.contains('Create').click()
      cy.get('#title').type('testi')
      cy.get('#author').type('testi')
      cy.get('#url').type('testi')
      cy.get('#create').click()
      cy.get('#view').click()
      cy.get('#like').click()
      cy.contains('Likes 1')
    })
  })
})



