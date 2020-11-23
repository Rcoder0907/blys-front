describe('Validation tests', () => {

      it('It should display error message with less than 6 character', () => {
        cy.visit('http://localhost:3000');

        cy.get('.input-box').eq(0).type(1);
        cy.get('.input-box').eq(1).type(2);
        cy.get('.input-box').eq(2).type(3);
        cy.get('.input-box').eq(3).type(2);
        cy.get('.input-box').eq(4).type(2);
        cy.get('.input-box').eq(5).type(5);

        
        cy.get('button[class=submit-button]').click();
        cy.get('.success-page').should('contain', 'Success Page!');
           
      });

  })