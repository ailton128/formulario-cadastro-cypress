class CadastroPage {

  preencherNome(nome){
    cy.get('#nome').clear().type(nome)
  }

  preencherSobrenome(sobrenome){
    cy.get('#sobrenome').clear().type(sobrenome)
  }

  preencherEmail(email){
    cy.get('#email').clear().type(email)
  }

  selecionarSenioridade(nivel){
    cy.get('#senioridade').select(nivel)
  }

  selecionarCypress(){
    cy.get('#cypress').check()
  }

  clicarEnviar(){
    cy.get('#enviar').click()
  }

}

export default new CadastroPage()