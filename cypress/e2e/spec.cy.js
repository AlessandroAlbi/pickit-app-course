
// const sizes = ['iphone-6', 'ipad-2', [1024, 768], 'macbook-15', [1920, 1080],];
const mobileSeizes = ['iphone-6', 'ipad-2'];
const desktopSizes = ['macbook-15', [1920, 1080]];

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


describe('Responsive design tests (desktop)', () => {
  desktopSizes.forEach(size => {
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
  mobileSeizes.forEach(size => {
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

describe('Login page tests', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('renders login page with all fields and button', () => {
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('contain', 'Login')
  })

  it('focuses on email input', () => {
    cy.get('input[name="email"]').focus()
    cy.focused().should('have.attr', 'name', 'email')
  })

  it('shows validation error if fields are empty', () => {
    cy.get('button[type="submit"]').click()
    cy.contains(/invalid email or password/i).should('be.visible')
  })

  it('logs in successfully with valid credentials', () => {
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/') // esempio
  })


  it('user login logout happy path', () => {
    cy.get('[name="email"]').click();
    cy.get('[name="email"]').type('user@example.com');
    cy.get('#root form.css-1yuhvjn').click();
    cy.get('[name="password"]').type('password123');
    cy.get('#root button[type="submit"]').click();
    cy.get('#root button[aria-label="user-avatar"] div').click();
    cy.get('li#user-menu:nth-of-type(2) p').click();
  })
})

describe('Home page tests', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('renders home page with welcome message', () => {
    cy.contains('Home').should('be.visible')
  })

  it('Open user menu', function() {
    cy.get('#root button[aria-label="user-avatar"] div').click();
  });

  it('Open user menu and logout', function() {
    cy.get('#root button[aria-label="user-avatar"] div').click();
    cy.get('li#user-menu:nth-of-type(2) p').click();
    cy.get('[name="email"]').click();
  });
})