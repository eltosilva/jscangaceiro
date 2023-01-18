class DateConverter {

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
    if (!/\d{2}\/\d{2}\/\d{4}/g.test(data))
      throw new DataInvalidaException()

    return new Date(data.split('/').reverse())
  }
}