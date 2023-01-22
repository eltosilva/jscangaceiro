import { Negociacao } from './Negociacao.js'

export class NegociacaoDao {
  /**@type {IDBDatabase} */
  _connection
  /**@type {string} */
  _store

  /** @param {IDBDatabase} connection */
  constructor(connection){
    this._connection = connection
    this._store = 'negociacoes'
  }

  /** @param {Negociacao} negociacao */
  adiciona(negociacao) {
    return new Promise((resolve, reject) => {
      const request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .add(negociacao)
      
      request.onsuccess = (e) => resolve()
      request.onerror = (e) => {
        console.error(e.target.error)
        reject('Não foi possível salvar a negociação')
      }
    })
  }

  /** 
   * @returns {Array<Negociacao>}
   */
  listaTodos() {
    return new Promise((resolve, reject) => {
      const negociacoes = []

      const cursor = this._connection
        .transaction([this._store], 'readonly')
        .objectStore(this._store)
        .openCursor()

      cursor.onsuccess = (e) => {
        const atual = e.target.result

        if(atual){
          negociacoes.push(new Negociacao(atual.value._data, atual.value._quantidade, atual.value._valor))
          atual.continue()
        }else{
          resolve(negociacoes)
        }
      }

      cursor.onerror = (e) => {
        console.log(e.target.error)
        reject('não foi possível listar as negociações')
      }
    })
  }

  apagaTodos() {
    return new Promise((resolve, reject) => {
      const request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .clear()

      request.onsuccess = e => resolve()
      request.onerror = e => {
        console.log(e.target.error)
        reject('Não foi posśível apagar as negociações')
      }
    })
  }
}