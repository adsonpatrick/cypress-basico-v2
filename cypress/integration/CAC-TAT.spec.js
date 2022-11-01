/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'text, text, text, text, text, text, text, text, text, text, text, text, text, text, text, text, text, text';  
        cy.get('#firstName').type("Adson")
        cy.get('#lastName').type("Silva")
        cy.get('#email').type("adsonsilva@exemplo.com")
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=>{
        cy.get('#firstName').type("Adson")
        cy.get('#lastName').type("Silva")
        cy.get('#email').type("adsonsilva@exemplo,com")
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })
    
    it('Campo telefonico continua vazio quando preenchido com valor não-numérico', ()=>{
        cy.get('#phone')
            .type('dakdjskadjak')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
        cy.get('#firstName').type("Adson")
        cy.get('#lastName').type("Silva")
        cy.get('#email').type("adsonsilva@exemplo.com")
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{
        cy.get('#firstName')
            .type('Adson')
            .should('have.value','Adson')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type("Silva")
            .should('have.value',"Silva")
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type("adsonsilva@exemplo.com")
            .should('have.value',"adsonsilva@exemplo.com")
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('12345454667')
            .should('have.value','12345454667')
            .clear()
            .should('have.value', '')
    })

    it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", ()=>{
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it("envia o formuário com sucesso usando um comando customizado", ()=>{
        cy.fillMandatoryFieldsAndSubmit()
    })

    it("seleciona um produto (YouTube) por seu texto", ()=>{
        cy.get("#product")
            .select("Youtube")
            .should("have.value", "youtube")
    })
    it("marca o tipo de atendimento Feedback", ()=>{
        cy.get('input[type="radio"] [value="feedback"]')
            .check()
            .should('have.value', 'feedbeck')
    })
    it('marcar cada tipo de atendimento', ()=>{
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio)=>{
                // faz tipo um laço de repetição
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })
    it('marca ambos checkboxes, depois desmarca o último', ()=>{
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', ()=>{
        cy.get('input[type"file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/exemplo.json')
            .should(($input)=>{
                expect($input[0].files[0].name).to.equal('exemplo.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', ()=>{
        cy.get('input[type"file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/exemplo.json', {action: 'drag-drop'})
            .should(($input)=>{
                expect($input[0].files[0].name).to.equal('exemplo.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
        cy.fixture('exemplo').as('sampleFile')
        cy.get('input[type"file"]')
            .selectFile('@sampleFile')
            .should(($input)=>{
                expect($input[0].files[0].name).to.equal('exemplo.json')
            })
            
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=>{
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', ()=>{
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    it('')
  })
