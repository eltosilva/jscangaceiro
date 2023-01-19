class Negociacao {

  /**@type {Date} */
  _data
  /**@type {number} */
  _quantidade
  /**@type {number} */
  _valor

  /**
   * @param {Date} data 
   * @param {number} quantidade 
   * @param {number} valor 
   */
  constructor(data, quantidade, valor) {
    this._data = new Date(data)
    this._quantidade = quantidade
    this._valor = valor
    Object.freeze(this)
  }

  equals(negociacao) {
    if(!negociacao || !negociacao instanceof Negociacao)
      return false

    return JSON.stringify(this) == JSON.stringify(negociacao)
  }

  get data() { return new Date(this._data) }
  get quantidade() { return this._quantidade }
  get valor() { return this._valor }
  get volume() { return this._quantidade * this._valor }
}