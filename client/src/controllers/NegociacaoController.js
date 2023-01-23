import { Negociacao, NegociacaoService, Negociacoes } from '../domain/index.js'
import { DataInvalidaException, DateConverter, Mensagem, MensagemView, NegociacoesView } from '../ui/index.js'
import { Bind, getNegociacaoDao, getExceptionMessage } from '../util/index.js'

export class NegociacaoController {

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

  async _init() {
    try {
      const dao = await getNegociacaoDao()
      const negociacoes = await dao.listaTodos()
      negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao))
    } catch (err) {
      this._mensagem.texto = getExceptionMessage(err)
    }
  }

  async importaNegociacoes() {
    try {
      const negociacoes = await this._service.obterNegociacoesDoPeriodo()
      negociacoes
        .filter(novaNegociacao => !this._negociacoes.contem(novaNegociacao))
        .forEach(negociacao => this._negociacoes.adiciona(negociacao))
      this._mensagem.texto = 'Negocições importadas com sucesso'
    }catch (err){
      this._mensagem.texto = getExceptionMessage(err)
    }
  }

  /**
   * @param {Event} event 
  */
  async adiciona(event) {
    try {
      event.preventDefault()

      const negociacao = this._criaNegociacao()

      try {
        const dao = await getNegociacaoDao()
        await dao.adiciona(negociacao)

        this._negociacoes.adiciona(negociacao)
        this._mensagem._texto = 'Negociacao adicionada com sucesso'
        this._limpaFormulario()
      } catch (err) {
        this._mensagem._texto = getExceptionMessage(err)
      }

    } catch (err) {
      console.error(err)
      this._mensagem.texto = getExceptionMessage(err)
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

  async apaga() {
    try{
      const dao = await getNegociacaoDao()
      await dao.apagaTodos()

      this._negociacoes.esvazia()
      this._mensagem.texto = 'Negociações apagadas com sucesso'
    }catch(err){
      this._mensagem.texto = getExceptionMessage(err)
    }
  }
}