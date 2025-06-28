/// <reference types="cypress" /> 
/// o comando acima serve pra facilitar na hora de ver a documentação. É só passar o mouse por cima que ele vai dar um monte de informação

//O comando abaixo serve para rodar o scrip
//      npx cypress open  

//cy.viewport
//arquivos de config
//configs por linha de comando -> serve para abrir o site em resolução mobile 
//      npx cypress open --config "viewportWidth=411,viewportHeight=823"
//      npx cypress run --config "viewportWidth=411,viewportHeight=823" -> serve para gravar a tela

context('Dev Finances', () => {

    //hooks são trechos de código que executam antes e depois do código
    //before -> antes de todos os testes
    //beforeEach -> antes de cada teste
    //after -> depois de todos os testes
    //afterEach -> depois de cada teste

    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/#') 

        cy.get('#data-table tbody tr').should('have.length', 0) //validar o tamanho tabela
    });

    //Cadastrar entradas
    it('Cadastrar entradas', () => {

        //Entender fluxo
        //Mapear os elementos que vamos interagir
        //Descrever as interações com cypress
        //Adicionar as asserções que a gente precisa

        cy.get('#transaction .button').click() //id + class
        cy.get('#description').type('Mesada') //id
        cy.get('[name=amount]').type(70) //atributos
        cy.get('[name=date]').type('2025-06-16') //atributos
        cy.get('button').contains('Salvar').click() //tipo e valor

        cy.get('#data-table tbody tr').should('have.length', 1) //validar o tamanho tabela

        
    });

    //Cadastrar saídas

    it('Cadastrar saídas', () => {

        cy.get('#transaction .button').click() //id + class
        cy.get('#description').type('Saco de pipoca') //id
        cy.get('[name=amount]').type(-12) //atributos
        cy.get('[name=date]').type('2025-06-16') //atributos
        cy.get('button').contains('Salvar').click() //tipo e valor

        cy.get('#data-table tbody tr').should('have.length', 1) //validar o tamanho tabela
        
    });

    //Remover entradas e saídas
    it('Remover entradas e saídas', () => {
        const entrada = 'Mesada'
        const saida = 'Milho de pipoca'

        cy.get('#data-table tbody tr').should('have.length', 0) //validar o tamanho tabela

        cy.get('#transaction .button').click() //id + class
        cy.get('#description').type(entrada) //id
        cy.get('[name=amount]').type(150) //atributos
        cy.get('[name=date]').type('2025-06-16') //atributos
        cy.get('button').contains('Salvar').click() //tipo e valor

        cy.get('#transaction .button').click() //id + class
        cy.get('#description').type(saida) //id
        cy.get('[name=amount]').type(-12) //atributos
        cy.get('[name=date]').type('2025-06-23') //atributos
        cy.get('button').contains('Salvar').click() //tipo e valor

        //PARA RETIRAR O VALOR DO MILHO DE PIPOCA//

        //Estratégia 1: voltar para o elemento pai e avançar para um td img attr
        cy.get('td.description')
            .contains(saida)
            .parent() //navegar para o elemento pai
            .find('img[onclick="Transaction.remove(1)"]') //ou img[onclick*=remove]
            .click()


        //Estratégia 2: buscar todos os irmãos e buscar o que tem img + attr
        cy.get('td.description')
            .contains(entrada)
            .siblings() //navegar para os elementos irmãos
            .children('img[onclick*=remove]') //elemento filho
            .click()

        cy.get('#data-table tbody tr').should('have.length', 0) //validar o tamanho tabela

    });
    
});