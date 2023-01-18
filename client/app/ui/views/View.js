class View {
  /**@type {HTMLElement} */
  #elemento

  /**
   * @param {string} seletor 
   */
  constructor(seletor) {
    this.#elemento = document.querySelector(seletor)
  }

  /**
   * @param {Mensagem | Negociacoes} model 
   */
  update(model) {
    this.#elemento.innerHTML = this.template(model)
  }

  template(model ) {
    throw new Error('Você precisa implementar o método template')
  }
}