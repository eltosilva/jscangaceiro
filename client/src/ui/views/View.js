export class View {
  /**@type {HTMLElement} */
  _elemento

  /**
   * @param {string} seletor 
   */
  constructor(seletor) {
    this._elemento = document.querySelector(seletor)
  }

  /**
   * @param {Mensagem | Negociacoes} model 
   */
  update(model) {
    this._elemento.innerHTML = this.template(model)
  }

  template(model ) {
    throw new Error('Você precisa implementar o método template')
  }
}