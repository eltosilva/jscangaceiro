class Negociacoes {
  
  /**@type {Array<Negociacao>} */
  #negociacoes

  constructor() {
    this.#negociacoes = []
  }

  /**
   * @param {Negociacao} negociacao 
   */
  adiciona(negociacao){
    this.#negociacoes.push(negociacao)
  }

  /**
   * @returns {Array<Negociacoes>}
   */
  paraArray() {
    return this.#negociacoes.slice()
  }
}