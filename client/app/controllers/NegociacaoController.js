class NegociacaoController {

  /**@type {HTMLInputElement} */
  #inputData
  /**@type {HTMLInputElement} */
  #inputQuantidade
  /**@type {HTMLInputElement} */
  #inputValor

  constructor() {
    const $ = document.querySelector.bind(document)
  
    this.#inputData = $('#data')
    this.#inputQuantidade = $('#quantidade')
    this.#inputValor = $('#valor')
  }
  /**
   * @param {Event} event 
   */
  adiciona(event) {
    event.preventDefault()

    const data = DateConverter.paraData(this.#inputData.value)
    console.log(this.#inputData.value)

    const negociacao = new Negociacao(
      data,
      parseInt(this.#inputQuantidade.value),
      parseFloat(this.#inputValor.value)
    )

    console.log(new Date())
    console.log(negociacao)
  }
}