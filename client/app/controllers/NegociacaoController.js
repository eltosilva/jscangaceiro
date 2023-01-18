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
  #negociacoesView
  /**@type {Mensagem} */
  #mensagem
  /**@type {MensagemView} */
  #mensagemView

  constructor() {
    const $ = document.querySelector.bind(document)

    this.#inputData = $('#data')
    this.#inputQuantidade = $('#quantidade')
    this.#inputValor = $('#valor')

    const self = this
    this.#negociacoes = new Proxy(new Negociacoes(), {
      get(target, prop, receiver){
        if(typeof(target[prop]) === 'function' && ['adiciona', 'esvazia'].includes(prop))
          return function() {
            target[prop].apply(target, arguments)
            self.armadilha(target)
          }

        return target[prop]
      }
    })
    
    this.#negociacoesView = new NegociacoesView('#negociacoes')

    this.#negociacoesView.update(this.#negociacoes)

    this.#mensagem = new Mensagem()
    this.#mensagemView = new MensagemView('#mensagemView')
    this.#mensagemView.update(this.#mensagem)
  }

  armadilha(model) {
    this.#negociacoesView.update(model)
  }
  /**
   * @param {Event} event 
  */
  adiciona(event) {
    event.preventDefault()

    this.#negociacoes.adiciona(this.#criaNegociacao())
    this.#mensagem.texto = 'Negociação adicionada com sucesso'

    //this.#negociacoeView.update(this.#negociacoes)
    this.#mensagemView.update(this.#mensagem)
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

  apaga() {
    this.#negociacoes.esvazia()
    // this.#negociacoeView.update(this.#negociacoes)
    this.#mensagem.texto = 'Negociações apagadas com sucesso'
    this.#mensagemView.update(this.#mensagem)
  }
}