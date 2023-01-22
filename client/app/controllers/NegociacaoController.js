class NegociacaoController {

  /**@type {HTMLInputElement} */
  _inputData
  /**@type {HTMLInputElement} */
  _inputQuantidade
  /**@type {HTMLInputElement} */
  _inputValor
  /**@type {Negociacoes} */
  _negociacoes
  /**@type {Mensagem} */
  _mensagem
  /**@type {NegociacaoService} */
  _service

  constructor() {
    const $ = document.querySelector.bind(document)

    this._inputData = $('#data')
    this._inputQuantidade = $('#quantidade')
    this._inputValor = $('#valor')

    this._negociacoes = new Bind(
      new Negociacoes(),
      new NegociacoesView('#negociacoes'),
      'adiciona', 'esvazia'
    )

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView('#mensagemView'),
      'texto'
    )
    this._service = new NegociacaoService()

    this._init()
  }
  
  _init() {
    getNegociacaoDao()
      .then(dao => dao.listaTodos())
      .then(negociacoes => negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao)))
      .catch(err => this._mensagem.texto = err)
  }

  importaNegociacoes() {

    this._service.obterNegociacoesDoPeriodo()
    .then(negociacoes => {
      negociacoes
        .filter(novaNegociacao => !this._negociacoes.contem(novaNegociacao))
        .forEach(negociacao => this._negociacoes.adiciona(negociacao))
      this._mensagem.texto = 'Negocições importadas com sucesso'
    })
    .catch(err => this._mensagem.texto = err)
  }

  /**
   * @param {Event} event 
  */
  adiciona(event) {
    try {
      event.preventDefault()

      const negociacao = this._criaNegociacao()
      getNegociacaoDao()
        .then(dao => dao.adiciona(negociacao))
        .then(() => {
          this._negociacoes.adiciona(negociacao)
          this._mensagem.texto = 'Negociacao adicionada com sucesso'
          this._limpaFormulario()
        })
        .catch(err => this._mensagem.texto = err)

    } catch (err) {
      console.error(err)

      if (err instanceof DataInvalidaException)
        this._mensagem.texto = err.message
      else
        this._mensagem.texto = 'Um erro não esperado aconteceu. Entre em contato com o suporte'
    }
  }

  /**
   * @returns {Negociacao}
   */
  _criaNegociacao() {
    return new Negociacao(
      DateConverter.paraData(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    )
  }

  _limpaFormulario() {
    this._inputData.value = ''
    this._inputQuantidade.value = 1
    this._inputValor.value = 0.0
    this._inputData.focus()
  }

  apaga() {

    getNegociacaoDao()
      .then(dao => dao.apagaTodos())
      .then(() => {
        this._negociacoes.esvazia()
        this._mensagem.texto = 'Negociações apagadas com sucesso'
      })
      .catch(err => this._mensagem.texto = err)
      
    this._negociacoes.esvazia()
    this._mensagem.texto = 'Negociações apagadas com sucesso'
  }
}