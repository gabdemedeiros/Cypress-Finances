//Entender o fluxo manualmente
//Mapear os elementos que vamos interagir
//Descrever as interações com o cypress
//Adicionar as asserções que a gente precisa

/// <reference types="cypress" /> 

import{format, prepareLocalStorage} from '../support/utils'

context('Dev Finances day 3', () => {

    beforeEach(() => {

        cy.visit('https://devfinance-agilizei.netlify.app/#', {
            onBeforeLoad: (win) => {
                prepareLocalStorage(win)
            }
        })

    });

    it('Cadastrar entradas', () => {
        
        cy.get('#transaction .button').click() //id + class
        cy.get('#description').type('Mesada') //id
        cy.get('[name=amount]').type(70) //atributos
        cy.get('[name=date]').type('2025-06-16') //atributos
        cy.get('button').contains('Salvar').click() //tipo e valor

        cy.get('#data-table tbody tr').should('have.length', 4) //validar o tamanho tabela

    });

    it('Cadastrar saídas', () => {

        cy.get('#transaction .button').click() //id + class
        cy.get('#description').type('Milho de pipoca') //id
        cy.get('[name=amount]').type(-12) //atributos
        cy.get('[name=date]').type('2025-06-16') //atributos
        cy.get('button').contains('Salvar').click() //tipo e valor

        cy.get('#data-table tbody tr').should('have.length', 4) //validar o tamanho tabela

    });

    it('Cadastrar entradas e saídas', () => {
       //PARA RETIRAR O VALOR DO MILHO DE PIPOCA//

        //Estratégia 1: voltar para o elemento pai e avançar para um td img attr
        cy.get('td.description')
            .contains('Milho de pipoca')
            .parent() //navegar para o elemento pai
            .find('img[onclick="Transaction.remove(1)"]') //ou img[onclick*=remove]
            .click()


        //Estratégia 2: buscar todos os irmãos e buscar o que tem img + attr
        cy.get('td.description')
            .contains('Mesada')
            .siblings() //navegar para os elementos irmãos
            .children('img[onclick*=remove]') //elemento filho
            .click()

        cy.get('#data-table tbody tr').should('have.length', 1) //validar o tamanho tabela 

    });

    it('Validar o saldo', () => {
        //Capturar as linhas com as transações
        //Formatar essas transações
        //Capturar o texto do total
        //Somar os valores de entrada e saída
        //Comparar o somatório de entradas e despesas com o total

        const entrada = 'Mesada'
        const saida = 'Milho de pipoca'
        const saida2 = 'Rodízio'

        //cy.get('#data-table tbody tr').should('have.length', 0) //validar o tamanho tabela

        //cy.get('#transaction .button').click() //id + class
        // cy.get('#description').type(entrada) //id
        // cy.get('[name=amount]').type(150) //atributos
        // cy.get('[name=date]').type('2025-06-16') //atributos
        // cy.get('button').contains('Salvar').click() //tipo e valor

        // cy.get('#transaction .button').click() //id + class
        // cy.get('#description').type(saida) //id
        // cy.get('[name=amount]').type(-12) //atributos
        // cy.get('[name=date]').type('2025-06-23') //atributos
        // cy.get('button').contains('Salvar').click() //tipo e valor

        // cy.get('#transaction .button').click() //id + class
        // cy.get('#description').type(saida2) //id
        // cy.get('[name=amount]').type(-75) //atributos
        // cy.get('[name=date]').type('2025-06-26') //atributos
        // cy.get('button').contains('Salvar').click() //tipo e valor

        let incomes = 0
        let expenses = 0

        cy.get('#data-table tbody tr')
            .each(($el, index, $list) => {

                cy.get($el).find('td.income, td.expense') .invoke('text').then(text => {//procura a coluna de entrada (income) e saída (expense)
                        
                    if(text.includes('-')){
                        expenses = expenses + format(text)
                    } else {
                        incomes = incomes + format(text)
                    }

                    cy.log('Entradas = ',incomes)
                    cy.log('Saídas = ',expenses)

                }) //pega o texto da coluna encontrada e trata pra a gente conseguir usar com a função text

        }) //vai fazer uma repetição de cada item de uma lista que foi encontrada para capturar o valor de cada linha
        

        cy.get('#totalDisplay') .invoke('text').then(text => {

            //cy.log('Valor total = ', format(text))

            let formatedTotalDisplay = format(text)
            let expectedTotal = incomes + expenses

            expect(formatedTotalDisplay).to.eq(expectedTotal)

        })

    })
    
})

