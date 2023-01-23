import { DataInvalidaException } from './DataInvalidaException'

export class DateConverter {

  constructor() {
    throw Error('Essa classe não pode ser instanciada.')
  }
  /**
   * @param {Date} data 
   * @returns {string}
   */
  static paraTexto(data) {
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }

  /**
   * @param {string} data 
   * @returns {Date}
  */
  static paraData(data) {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/g
    const dataSplit = regex.exec(data)

    if (!dataSplit)
      throw new DataInvalidaException()

    return new Date(dataSplit.slice(1).reverse())
  }

  /**
   * @param {string} data 
   */
  static paraDataCompleta(data) {
    const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}.\d{3})Z$/g
    const dataSplit = regex.exec(data)

    if (!dataSplit)
      throw new DataInvalidaException()

    return new Date(...dataSplit.slice(1).map(num => new Number(num).valueOf()))
  }
}