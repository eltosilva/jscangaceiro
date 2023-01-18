class Mensagem {
  /**@type {string} */
  #texto

  constructor(texto = '') {
    this.#texto = texto
  }
  /**
   * @param {string} texto
   */
  set texto(texto) {
    this.#texto = texto
  }

  get texto() {
    return this.#texto
  }
}