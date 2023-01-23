import { DateConverter } from '../../ui/converters/DateConverter.js'
import { ApplicationException } from '../../util/ApplicationException.js'
import { HttpService } from '../../util/HttpService.js'
import { Negociacao } from './Negociacao.js'

export class NegociacaoService {

  /**@type {HttpService} */
  _http

  constructor() {
    this._http = new HttpService()
  }

  obterNegociacoesDaSemana(cb) {
    return this._http
      .get('negociacoes/semana')
      .then(
        dados => dados.map(objeto => new Negociacao(DateConverter.paraDataCompleta(objeto.data), objeto.quantidade, objeto.valor)),
        err => { throw new ApplicationException('Não foi possível obter as negociações da semana') }
      )
  }

  obterNegociacoesDaSemanaAnterior() {
    return this._http
      .get('negociacoes/anterior')
      .then(
        dados => dados.map(objeto => new Negociacao(DateConverter.paraDataCompleta(objeto.data), objeto.quantidade, objeto.valor)),
        err => { throw new ApplicationException('Não foi possível obter as negociações da semana anterior') }
      )
  }

  obterNegociacoesDaSemanaRetrasada(cb) {
    return this._http
      .get('negociacoes/retrasada')
      .then(
        dados => dados.map(objeto => new Negociacao(DateConverter.paraDataCompleta(objeto.data), objeto.quantidade, objeto.valor)),
        err => { throw new ApplicationException('Não foi possível obter as negociações da semana retrasada') }
      )
  }

  async obterNegociacoesDoPeriodo() {
    try {
      const periodo = await Promise.all([
        this.obterNegociacoesDaSemana(),
        this.obterNegociacoesDaSemanaAnterior(),
        this.obterNegociacoesDaSemanaRetrasada()
      ])
      return periodo
        .reduce((novoArray, item) => novoArray.concat(item), [])
        .sort((negociacaoA, negociacaoB) => negociacaoA.data.getTime() - negociacaoB.data.getTime())
    } catch (err) {
      console.error(err)
      throw new ApplicationException('Não foi possível obter as negociações do período')
    }
  }
}