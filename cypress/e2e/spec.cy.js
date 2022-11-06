describe('RStudio Assessment Tests', () => {

  // Delete previously created space
  beforeEach(() => {
      cy.visit('https://rstudio.cloud/content/yours?sort=name_asc')
      cy.get('#appBody').find('#navPanel').invoke('show').click({ force: true })
      cy.get('#navPanel > div.panelContents > div.navMenu > div.spaceMenu.mobileSubsOnly > div.menu > a.menuItem.space2.space.active').click({ force: true })
      cy.get('#navPanel > div.panelContents > div.navMenu > div.spaceMenu.mobileSubsOnly > div.menu > a:nth-child(2)').find('div.spaceNameWithOwner').click({ force: true })
      cy.get('#rStudioHeader > div.band > div.innards.bandContent > div.actionBar.menu.aux').invoke('show').click({ force: true })
      cy.get('#rStudioHeader > div.band > div.innards.bandContent > div.actionBar.menu.aux > div > button').invoke('show').click({ force: true })
      cy.get('#headerDeleteSpaceButton').click()
      cy.get('#deleteSpaceTest').type('Delete space1')
      cy.get('#deleteSpaceSubmit').should('be.visible').click()
      cy.get('#rStudioHeader > div.statusMessage > div').should('be.visible')
  })

  it('creates a new space, a new project, and verify ide', () => {

      // Get the header title to verify Your Workspace page shows 
      cy.get('#headerTitle').should('contain', 'Your Workspace')

      // Get the nav panel side bar by to show by invoke method since div is blocked
      cy.get('#appBody').find('#navPanel').invoke('show').click({ force: true })

      // Get the new space button and force click the link to create new space
      // then input name of new space and verify text
      // Get the create button and then click to create space
      cy.get('#navPanel > div.panelContents > div.navMenu > div.spaceMenu.mobileSubsOnly > div.menu > button').click({ force: true })
      cy.get('#name[type=text]').type('space1').should('have.value', 'space1')
      cy.get('#main > div:nth-child(4) > div > div > form > div.actions > button').contains('Create').click()

      // Get headertitle and verify header contains name of newly created space
        //cy.get('#headerTitleOwner').should('contain', 'space1')
      cy.get('#headerTitle').should('contain', 'space1')

      // Get and click new project button
      // Then get button and click link to create new RStudio Project 
      // Verify new untitled project is created 
      cy.get('#main > div.band.pushFooter > div > div > div.fullWidth > div.flexSpaceBetween.flexAlignBaseline > div.actionBar.inline.showTitles > div > button').click()
      cy.get('#main > div.band.pushFooter > div > div > div.fullWidth > div.flexSpaceBetween.flexAlignBaseline > div.actionBar.inline.showTitles > div > div > button.action.newRStudioProject').click()
      cy.get('#currentLocation > button').should('contain', 'Untitled Project').click()

      // Get input element and update name of project
      // Verify text of button updated with expected text
      cy.get('#currentLocation > input').type('Project1 {enter}')
      cy.get('#currentLocation > button', { timeout: 50000 }).should('contain', 'Project1')

      //cy.get('#main > div.band.pushFooter > div > div > div.fullWidth > div:nth-child(3) > div > div > div.itemHeader > div.itemTitle > a > span').should('contain', 'Project1').click()

      //verify RStudio IDE loads
      cy.get('#contentIFrame', { timeout: 60000 }).should('exist')
      
  })
})






