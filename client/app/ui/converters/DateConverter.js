class DateConverter {

  constructor(){
    throw Error('Essa classe não pode ser instanciada.')
  }
  /**
   * @param {Date} data 
   * @returns {string}
   */
  static paraTexto(data){
    if(!/\d{4}-\d{2}-\d{2}/g.test(data))
      throw new Error('A data deve estar no formato aaaa-mm-dd')

    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }

  /**
   * @param {string} data 
   * @returns {Date}
   */
  static paraData(data){
    return new Date(data.split('-'))
  }
}