class NegociacaoController {

  /**@type {HTMLInputElement} */
  #inputData
  /**@type {HTMLInputElement} */
  #inputQuantidade
  /**@type {HTMLInputElement} */
  #inputValor
  /**@type {Negociacoes} */
  #negociacoes
  /**@type {NegociacoesView}*/
  #negociacoeView

  constructor() {
    const $ = document.querySelector.bind(document)

    this.#inputData = $('#data')
    this.#inputQuantidade = $('#quantidade')
    this.#inputValor = $('#valor')
    this.#negociacoes = new Negociacoes()
    this.#negociacoeView = new NegociacoesView('#negociacoes')
  }
  /**
   * @param {Event} event 
  */
  adiciona(event) {
    event.preventDefault()

    this.#negociacoes.adiciona(this.#criaNegociacao())
    this.#negociacoeView.update(this.#negociacoes)
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