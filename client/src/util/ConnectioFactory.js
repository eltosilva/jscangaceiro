const stores = ['negociacoes']
/**@type {IDBDatabase} */
let connection = null
/**@type {Function} */
let close = null

export class ConnectionFactory {
  constructor() {
    throw new Error('Não é possível criar instâncias dessa classe')
  }

  /**
   * @returns {Promise<IDBDatabase>}
   */
  static getConnection() {
    return new Promise((resolve, reject) => {
      if (connection)
        resolve(connection)

      /**@type {IDBOpenDBRequest} */
      const openRequest = indexedDB.open('jscangaceiro', 2)

      /** @param {IDBVersionChangeEvent} e */
      openRequest.onupgradeneeded = (e) => {
        ConnectionFactory._createStores(e.target.result)
      }

      /** @param {IDBVersionChangeEvent} e */
      openRequest.onsuccess = (e) => {
        if (!connection) {
          connection = e.target.result
          close = connection.close.bind(connection)
          connection.close = () => { throw new Error('Você não pode fechar diretamente a conexão') }
        }

        resolve(connection)
      }
      /** @param {IDBVersionChangeEvent} e */
      openRequest.onerror = (e) => {
        console.log(e.target.error)
        reject(e.target.error.name)
      }
    })
  }

  /** @param {IDBDatabase} db */
  static _createStores(db) {
    stores.forEach(store => {
      if (db.objectStoreNames.contains(store))
        db.deleteObjectStore(store)
      db.createObjectStore(store, { autoIncrement: true })
    })
  }

  static closeConnection() {
    if (connection)
      close()
  }
}