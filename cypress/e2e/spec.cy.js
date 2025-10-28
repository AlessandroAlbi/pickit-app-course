// const sizes = ['iphone-6', 'ipad-2', [1024, 768], 'macbook-15', [1920, 1080],];

const mobileSeizes = ['iphone-6', 'ipad-2'];
const desktopSizes = ['macbook-15', [1920, 1080], [1024, 768]];

describe('Responsive design tests (desktop)', () => {
  desktopSizes.forEach((size) => {
    it(`should display correctly on ${size}`, () => {
      if (Array.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.visit('/');
      cy.contains('Home').should('be.visible');
    });
  });
});

describe('Responsive design tests (mobile)', () => {
  mobileSeizes.forEach((size) => {
    it(`should display correctly on ${size}`, () => {
      if (Array.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.visit('/');
      cy.get('[data-testid="MenuIcon"]').click();
      cy.get('div#menu-appbar:nth-of-type(2) li[tabindex="0"]').click();
    });
  });
});

// describe('Responsive design tests (desktop)', () => {
//   sizes.forEach(size => {
//     it(`should display correctly on ${size}`, () => {
//       if (Array.isArray(size)) {
//         cy.viewport(size[0], size[1]);
//       } else {
//         cy.viewport(size);
//       }
//       cy.visit('/');
//       cy.contains('Home').should('be.visible');
//     });
//   });
// });

describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders home page with orders', () => {
    cy.contains('Order ID: 1').should('be.visible');
    cy.contains('Order ID: 2').should('be.visible');
    cy.contains('Order ID: 3').should('be.visible');
  });

  it('Navigate using the navbar', function () {
    cy.get('#root div.css-1t6c9ts button:nth-child(1)').click();
    cy.get('#root div.css-1t6c9ts button:nth-child(2)').click();
    cy.get('#root button:nth-child(3)').click();
    cy.get('#root button:nth-child(2)').click();
    cy.get('#root div.css-1t6c9ts button:nth-child(1)').click();
  });
});

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.viewport('iphone-3');
  });

  it('renders login page with all fields and button', () => {
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Login');
  });

  it('focuses on email input', () => {
    cy.get('input[name="email"]').focus();
    cy.focused().should('have.attr', 'name', 'email');
  });

  it('shows validation error if fields are empty', () => {
    cy.get('button[type="submit"]').click();
    cy.contains(/invalid email or password/i).should('be.visible');
  });

  it('Happy path login logout', function () {
    cy.get('[name="email"]').click();
    cy.get('[name="email"]').type('user@example.com');
    cy.get('[name="password"]').click();
    cy.get('[name="password"]').type('password123');
    cy.get('#root button[type="submit"]').click();
    cy.get('#root button[aria-label="user-avatar"] div').click();
    cy.get('li#user-menu:nth-of-type(2) p').click();
  });
});

describe('Home orders', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Delete an order', function () {
    cy.get('#root button[aria-label="Delete order 1"]').click();
    cy.get('#root button[aria-label="Delete order 2"]').click();
    cy.get('#root button[aria-label="Delete order 3"]').click();
    cy.get('#root button[aria-label="Delete order 1"]').should('not.exist');
  });
});
