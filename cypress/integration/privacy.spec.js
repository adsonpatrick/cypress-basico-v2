it('testa a página da política de privavidade de forma independente', ()=>{
    cy.visit('./src/index.html')

    cy.contains('Talking About Testing').should('be.visible')
})