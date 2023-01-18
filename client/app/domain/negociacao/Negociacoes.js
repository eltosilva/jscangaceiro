class Negociacoes {
  
  /**@type {Array<Negociacao>} */
  #negociacoes

  /**@type {Function} */
  #armadilha

  constructor(armadilha) {
    this.#negociacoes = []
    
    this.#armadilha = armadilha
    Object.freeze(this)
  }

  /**
   * @param {Negociacao} negociacao 
   */
  adiciona(negociacao){
    this.#negociacoes.push(negociacao)
    this.#armadilha(this)
  }
  
  esvazia() {
    this.#negociacoes.length = 0
    this.#armadilha(this)
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