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
   * @returns {Array<Negociacao>}
   */
  paraArray() {
    return this.#negociacoes.slice()
  }

  get volumeTotal() {
    return this.#negociacoes.reduce((total, negociacao) => total + negociacao.volume, 0)
  }
}