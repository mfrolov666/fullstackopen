describe('Blog app', () => {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user1 = {
      name: 'Max',
      username: 'Max',
      password: 'Max'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
    const user2 = {
      name: 'Xam',
      username: 'Xam',
      password: 'Xam'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('')
  })

  it('Login form is shown', () => {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Max')
      cy.get('#password').type('Max')
      cy.get('#login-button').click()
      cy.contains('Max logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Max')
      cy.get('#password').type('Max1')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
      cy.get('.error').should('contain','Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Max logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Max', password: 'Max' })
    })

    it('A new blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('autotitle')
      cy.get('#author').type('autoauthor')
      cy.get('#url').type('autourl')
      cy.get('#create').click()
      cy.get('html').should('contain', 'autotitle')
    })

    it('Another user cant remove blog', () => {
      cy.createBlog({
        title: 'user1blog',
        author: 'new author',
        url: 'new url'
      })
      cy.contains('user1blog')
      cy.get('#logout').click()
      cy.login({ username: 'Xam', password: 'Xam' })
      cy.get('#target').should('contain', 'user1blog')
      cy.get('#remove').should('not.be.visible')
    })

    it('A new blog can be created and removed by the same user', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('autotitle')
      cy.get('#author').type('autoauthor')
      cy.get('#url').type('autourl')
      cy.get('#create').click()
      cy.contains('autotitle').siblings('button').contains('Remove').click()
      cy.get('html').should('not.contain', 'autotitle')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'new title',
          author: 'new author',
          url: 'new url'
        })
        cy.createBlog({
          title: 'mumumu',
          author: 'mumumu',
          url: 'mumumu',
          likes: 1
        })
        cy.createBlog({
          title: 'yuyuyu',
          author: 'yuyuyu',
          url: 'yuyuyu',
          likes: 2
        })
      })

      it.only('blogs are in a right order', function () {
        cy.get('.blogs').eq(0).should('contain', 'yuyuyu')
        cy.get('.blogs').eq(1).should('contain', 'mumumu')
        cy.get('.blogs').eq(2).should('contain', 'new title')
      })

      it('it can be liked', function () {
        cy.contains('new title')
          .siblings('#view')
          .click()
        cy.contains('Like')
        cy.get('#like').click()
        cy.get('html').should('contain', 'Likes:1')
        cy.get('.error').should('contain','The blog \'new title\' likes changed to 1')
      })
    })
  })
})
