class Negociacao {

  /**@type {Date} */
  #data
  /**@type {number} */
  #quantidade
  /**@type {number} */
  #valor

  /**
   * @param {Date} data 
   * @param {number} quantidade 
   * @param {number} valor 
   */
  constructor(data, quantidade, valor) {
    this.#data = new Date(data)
    this.#quantidade = quantidade
    this.#valor = valor
    Object.freeze(this)
  }

  get data() { return new Date(this.#data) }
  get quantidade() { return this.#quantidade }
  get valor() { return this.#valor }
  get volume() { return this.#quantidade * this.#valor }
}