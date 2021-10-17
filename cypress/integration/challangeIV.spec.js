/// <reference types="cypress" />

var Chance = require('chance'); // Load Chance
var chance = new Chance(); // Instantiate Chance so it can be used

describe('Automation Practice - Sign in', () => {
    
   it('Cenário - Validação de e-mail - Campo vazio', () => {
    /*
    1) Acessar o site e clicar no link "Sign in"
    2) Validar as ações abaixo:
        2.1) Clicar no botão "Create an account" -> Deveria mostrar mensagem de e-mail inválido
        2.2) Preencher um e-mail inválido qualquer e clicar no botão -> Deveria mostrar mensagem de e-mail inválido
    */
        // 2.1

        // Acessar o site e clicar no link "Sign in"
        cy.visit('http://automationpractice.com/')
        cy.contains('Sign in').click()
        // Clicar no botão "Create an account" -> Deveria mostrar mensagem de e-mail inválido
        cy.get('button[name=SubmitCreate]').click()
        cy.contains('Invalid').should('contain.text', 'Invalid email')

        // 2.2

        // Acessar o site e clicar no link "Sign in"
        cy.visit('http://automationpractice.com/')
        cy.contains('Sign in').click()
        // Preencher um e-mail inválido qualquer e clicar no botão -> Deveria mostrar mensagem de e-mail inválido
        cy.get('input[name=email_create]').type('ANY@TEXT')
        cy.get('button[name=SubmitCreate]').click()
        cy.contains('Invalid').should('contain.text', 'Invalid email')
   });
    
    it('Cenário - Validar campos obrigatórios', () => {
        /*
        Cenário - Validar campos obrigatórios
            1) Acessar o site e clicar no link "Sign in"
            2) Informar um e-mail válido para criar uma conta
                2.1) Adicionar validações nos campos obrigatórios
            3) Preencher o formulário com dados válidos aleatórios
            4) Concluir o cadastro com sucesso
        */

        // Acessar o site e clicar no link "Sign in"
        cy.visit('http://automationpractice.com/index.php?controller=authentication')
        
        // Informar um e-mail válido para criar uma conta
        cy.get('input[name=email_create]').type(chance.email())
        cy.get('button[name=SubmitCreate]').click()

        // Adicionar validações nos campos obrigatórios
        cy.get('button#submitAccount').click()
            //Validar "First Name"
            cy.get('input[name=customer_firstname]').type('{enter}')
                cy.contains('firstname').should('contain.text', 'firstname')
            cy.get('input[name=customer_firstname]').type(chance.first()).type('{enter}')
                cy.contains('firstname').should('not.exist', 'firstname')

            //Validar "Last Name"
            cy.get('input[name=customer_lastname]').type('{enter}')
                cy.contains('lastname').should('contain.text', 'lastname')
            cy.get('input[name=customer_lastname]').type(chance.last()).type('{enter}')
                cy.contains('lastname').should('not.exist', 'lastname')
            
            //Validar "Address"
            cy.get('input[name=address1]').type('{enter}')
                cy.contains('address1').should('contain.text', 'address1')
            cy.get('input[name=address1]').type(chance.address()).type('{enter}')
                cy.contains('address1').should('not.exist', 'address1')

            //Validar "City"
            cy.get('input[name=city]').type('{enter}')
                cy.contains('city').should('contain.text', 'city')
            cy.get('input[name=city]').type('Miami').type('{enter}')
                cy.contains('city').should('not.exist', 'city')

            //Validar "Zip"
            cy.get('input[name=postcode]').type('{enter}')
                cy.contains('00000').should('contain.text', '00000')
            cy.get('input[name=postcode]').type(chance.zip()).type('{enter}')
                cy.contains('00000').should('not.exist', '00000')

            //Validar "Phone"
            cy.get('input[name=phone_mobile]').type('{enter}')
                cy.contains('phone number').should('contain.text', 'phone number')
            cy.get('input[name=phone_mobile]').type(chance.phone()).type('{enter}')
            cy.contains('phone number').should('contain.text', 'phone number')
            
            //Validar "State"
            cy.get('select#id_state').select('Florida', {force:true})
                
            //Validar "Password"
            cy.get('input#passwd').type('{enter}')
                cy.contains('passwd').should('contain.text', 'passwd')
            cy.get('input#passwd').type('DesafioIV@2021').type('{enter}')
                cy.contains('passwd').should('not.exist', 'passwd')
            
            cy.url().should('contain', 'my-account') 
   });
    it('Cenário - Green Path', () => {
        /*
        Cenário Green Path
            1) Acessar o site e clicar no link "Sign in"
            2) Informar um e-mail válido para criar uma conta
            3) Preencher o formulário com dados válidos aleatórios
            4) Concluir o cadastro com sucesso
        */

        //Acessar o site e clicar no link "Sign in"
        cy.visit('http://automationpractice.com/')
        cy.contains('Sign in').click()

        //Informar um e-mail válido para criar uma conta
        cy.get('input[name=email_create]').type(chance.email())
        cy.get('button[name=SubmitCreate]').click()

        //Preencher o formulário com dados válidos aleatórios
        /* PERSONAL INFORMATION */
        cy.get('input[type=radio]').first().check()
        cy.get('input[name=customer_firstname]').type(chance.first())
        cy.get('input[name=customer_lastname]').type(chance.last())
        cy.get('input#passwd').type('DesafioIV@2021')
        cy.get('select#days').select('6', {force: true})
        cy.get('select#months').select(chance.month(), {force: true})
        cy.get('select#years').select('2000', {force: true})
        cy.get('input#newsletter').check('1')
        cy.get('input#optin').check('1')

        /* ADDRESS INFORMATION */
        cy.get('input[name=company]').type(chance.company())
        cy.get('input[name=address1]').type(chance.address())
        cy.get('input[name=address2]').type('Lorem ipsum')
        cy.get('input[name=city]').type('Miami')
        cy.get('select#id_state').select('Florida', {force:true})
        cy.get('input[name=postcode]').type(chance.zip())
        cy.get('textarea[name=other]').type(chance.sentence())
        cy.get('input[name=phone]').type(chance.phone())
        cy.get('input[name=phone_mobile]').type(chance.phone())
        cy.get('input[name=alias]').clear().type('Bootcamp 7')

        /* CONCLUIR O CADASTRO */
        cy.get('button#submitAccount').click()
        cy.url().should('contain', 'my-account')     
    });
});