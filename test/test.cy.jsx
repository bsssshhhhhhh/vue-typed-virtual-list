/* eslint-disable no-undef */
import TestWrapper from './TestWrapper.vue';
import WithScriptSetup from './WithScriptSetup.vue';

const mountComponents = () => {
  cy.viewport('macbook-16');
  cy.mount(TestWrapper);
};

beforeEach(() => {
  mountComponents();
});

it('should render', () => {
  // empty
});



it('should render some items', () => {
  cy.get('[aria-rowindex]').should('have.length.at.least', 8);
  cy.get('[aria-rowcount]').scrollTo('bottom');
  cy.get('[aria-rowindex]').should('have.length.at.least', 8);
  cy.get('[aria-rowcount]').scrollTo(0, 400000);
  cy.get('[aria-rowindex]').should('have.length.at.least', 8);
});
