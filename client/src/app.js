import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

import 'bootstrap/js/modal'

import '../css/meucss.css'

import { NegociacaoController } from './controllers/NegociacaoController'

$('h1').on('click', () => alert('Foi clicado!'))

const controller = new NegociacaoController()

const negociacao = {data: new Date(), quantidadde: 1, valor: 200}

const cabecalhos = new Headers()
cabecalhos.set('Content-Type', 'application/json')

const config = {
  method: 'POST',
  headers: cabecalhos,
  body: JSON.stringify(negociacao)
}

fetch('http://localhost:3000/negociacoes', config)
  .then(() => console.log('Dado enviado com sucesso'))