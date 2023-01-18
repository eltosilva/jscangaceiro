class NegociacaoController {

  /**@type {HTMLInputElement} */
  #inputData
  /**@type {HTMLInputElement} */
  #inputQuantidade
  /**@type {HTMLInputElement} */
  #inputValor
  /**@type {Negociacoes} */
  #negociacoes

  constructor() {
    const $ = document.querySelector.bind(document)

    this.#inputData = $('#data')
    this.#inputQuantidade = $('#quantidade')
    this.#inputValor = $('#valor')
    this.#negociacoes = new Negociacoes()
  }
  /**
   * @param {Event} event 
   */
  adiciona(event) {
    event.preventDefault()

    this.#negociacoes.adiciona(this.#criaNegociacao())
    console.log(this.#negociacoes.paraArray())

    this.#limpaFormulario()
  }

  /**
   * @returns {Negociacao}
   */
  #criaNegociacao() {
    return new Negociacao(
      DateConverter.paraData(this.#inputData.value),
      parseInt(this.#inputQuantidade.value),
      parseFloat(this.#inputValor.value)
    )
  }

  #limpaFormulario() {
    this.#inputData.value = ''
    this.#inputQuantidade.value = 1
    this.#inputValor.value = 0.0
    this.#inputData.focus()
  }
}