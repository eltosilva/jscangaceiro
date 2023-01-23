import { NegociacaoController } from './controllers/NegociacaoController.js'
import { Negociacao } from './domain/index.js'

const controller = new NegociacaoController()
const $ = document.querySelector.bind(document)

const negociacao = {data: new Date(), quantidadde: 1, valor: 200}

const cabecalhos = new Headers()
cabecalhos.set('Content-Type', 'application/json')

const config = {
  method: 'POST',
  headers: cabecalhos,
  body: JSON.stringify(negociacao)
}

fetch('/negociacoes', config)
  .then(() => console.log('Dado enviado com sucesso'))