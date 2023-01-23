import { obrigatorio } from '../../util'

export class Negociacao {

  /**
   * @param {Date} data 
   * @param {number} quantidade 
   * @param {number} valor 
   */
  constructor(data = obrigatorio('data'), quantidade = obrigatorio('quantidade'), valor = obrigatorio('valor')) {
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