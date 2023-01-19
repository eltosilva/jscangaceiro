class Negociacoes {
  
  /**@type {Array<Negociacao>} */
  _negociacoes

  constructor() {
    this._negociacoes = []
    Object.freeze(this)
  }

  /**
   * @param {Negociacao} negociacao 
   */
  adiciona(negociacao){
    this._negociacoes.push(negociacao)
  }
  
  esvazia() {
    this._negociacoes.length = 0
  }

  /**
   * @returns {Array<Negociacao>}
   */
  paraArray() {
    return this._negociacoes.slice()
  }

  /**
   * @param {Negociacao} neg 
   * @returns {boolean}
   */
  contem(neg){
    return this._negociacoes.some(negociacao => negociacao.equals(neg))
  }


  get volumeTotal() {
    return this._negociacoes.reduce((total, negociacao) => total + negociacao.volume, 0)
  }
}