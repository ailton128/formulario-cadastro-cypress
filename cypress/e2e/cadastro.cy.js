

describe('Cadastro de Candidato', () => {

  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/public/formulario.html')
  })

  function preencherFormularioValido() {
    cy.get('#nome').clear().type('Ailton')
    cy.get('#sobrenome').clear().type('Silva')
    cy.get('#email').clear().type('ailton@email.com')
    cy.get('#senioridade').select('Júnior')
    cy.get('#cypress').check()
  }

  function preencherFormularioExceto(excecao) {
    if (excecao !== 'nome') cy.get('#nome').clear().type('Ailton')
    if (excecao !== 'sobrenome') cy.get('#sobrenome').clear().type('Silva')
    if (excecao !== 'email') cy.get('#email').clear().type('ailton@email.com')
    if (excecao !== 'senioridade') cy.get('#senioridade').select('Júnior')
    cy.get('#cypress').check()
  }

  // ✅ SUCESSO
  it('Deve enviar formulário com sucesso', () => {
    preencherFormularioValido()
    cy.get('#enviar').click()

    cy.get('#mensagem')
      .should('be.visible')
      .and('contain', 'Cadastro realizado com sucesso')
  })

  // ===============================
  // 🔴 VALIDAÇÕES DO NOME
  // ===============================

  it('Não deve enviar se o nome estiver vazio', () => {
    preencherFormularioExceto('nome')
    cy.get('#nome').clear()
    cy.get('#enviar').click()

    cy.get('#erro-nome')
      .should('be.visible')
      .and('contain', 'Nome é obrigatório')

    cy.get('#mensagem').should('not.be.visible')
  })

  it('Não deve enviar se o nome contiver números', () => {
    preencherFormularioExceto('nome')
    cy.get('#nome').clear().type('Ailton123')
    cy.get('#enviar').click()

    cy.get('#erro-nome')
      .should('be.visible')
      .and('contain', 'Nome deve conter apenas letras')
  })

  it('Não deve enviar se o nome contiver caracteres especiais', () => {
    preencherFormularioExceto('nome')
    cy.get('#nome').clear().type('Ailton@')
    cy.get('#enviar').click()

    cy.get('#erro-nome')
      .should('be.visible')
      .and('contain', 'Nome deve conter apenas letras')
  })

  it('Não deve enviar se o nome tiver menos de 2 caracteres', () => {
    preencherFormularioExceto('nome')
    cy.get('#nome').clear().type('A')
    cy.get('#enviar').click()

    cy.get('#erro-nome')
      .should('be.visible')
      .and('contain', 'Nome deve ter no mínimo 2 caracteres')
  })

  it('Não deve enviar se o nome contiver script malicioso', () => {
    preencherFormularioExceto('nome')
    cy.get('#nome').clear().type('<script>alert(1)</script>')
    cy.get('#enviar').click()

    cy.get('#erro-nome')
      .should('be.visible')
      .and('contain', 'Nome deve conter apenas letras')
  })

  // ===============================
  // 🔴 SOBRENOME
  // ===============================

  it('Não deve enviar se o sobrenome estiver vazio', () => {
    preencherFormularioExceto('sobrenome')
    cy.get('#sobrenome').clear()
    cy.get('#enviar').click()

    cy.get('#erro-sobrenome')
      .should('be.visible')
      .and('contain', 'Sobrenome é obrigatório')

    cy.get('#mensagem').should('not.be.visible')
  })
  
  it('Não deve enviar se o sobrenome contiver números', () => {
    preencherFormularioExceto('sobrenome')
    cy.get('#sobrenome').clear().type('Sobrenome128')
    cy.get('#enviar').click()

    cy.get('#erro-sobrenome')
      .should('be.visible')
      .and('contain', 'Sobrenome deve conter apenas letras')
  })

  it('Não deve enviar se o sobrenome contiver caracteres especiais', () => {
    preencherFormularioExceto('sobrenome')
    cy.get('#sobrenome').clear().type('Sobrenome@')
    cy.get('#enviar').click()

    cy.get('#erro-sobrenome')
      .should('be.visible')
      .and('contain', 'Sobrenome deve conter apenas letras')
  })

  it('Não deve enviar se o sobrenome tiver menos de 2 caracteres', () => {
    preencherFormularioExceto('sobrenome')
    cy.get('#sobrenome').clear().type('S')
    cy.get('#enviar').click()

    cy.get('#erro-sobrenome')
      .should('be.visible')
      .and('contain', 'Sobrenome deve ter no mínimo 2 caracteres')
  })

  it('Não deve enviar se o sobrenome contiver script malicioso', () => {
    preencherFormularioExceto('sobrenome')
    cy.get('#sobrenome').clear().type('<script>alert(1)</script>')
    cy.get('#enviar').click()

    cy.get('#erro-sobrenome')
      .should('be.visible')
      .and('contain', 'Sobrenome deve conter apenas letras')
  })

  // ===============================
  // 🔴 EMAIL
  // ===============================
describe('Cadastro de Candidato', () => {

  const emailsInvalidos = [
    'ailton',
    'ailton@',
    '@gmail.com',
    'ailton gmail.com',
    'ailton@@gmail.com',
    'ailton.gmail.com',
    'ailton#gmail.com'
  ]

  emailsInvalidos.forEach((email) => {

    it(`Não deve enviar com email inválido: ${email}`, () => {

      preencherFormularioExceto('email')

      cy.get('#email').clear().type(email)
      cy.get('#enviar').click()

      cy.get('#erro-email')
        .should('be.visible')
        .and('contain', 'Email inválido')

    })

  })

})

  // ===============================
  // 🔴 SENIORIDADE
  // ===============================

  it('Não deve enviar se a senioridade não for selecionada', () => {
    preencherFormularioExceto('senioridade')
    cy.get('#enviar').click()

    cy.get('#erro-senioridade')
      .should('be.visible')
      .and('contain', 'Selecione a senioridade')

    cy.get('#mensagem').should('not.be.visible')
  })

  // ===============================
  // 🟡 DUPLO CLICK
  // ===============================

  it('Não deve duplicar mensagem ao clicar duas vezes', () => {
    preencherFormularioValido()
    cy.get('#enviar').click()
    cy.get('#enviar').click()

    cy.get('#mensagem').should('have.length', 1)
  })

})