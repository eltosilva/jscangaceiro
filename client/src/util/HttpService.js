export class HttpService {

  /**
   * @param {string} url 
   * @returns {Promise}
   */
  get(url) {
    return fetch(url)
      .then(res => this._handlerErros(res))
      .then(res => res.json())
  }

  /** 
   * @param {Response} res 
   */
  _handlerErros(res) {
    if (!res.ok)
      throw new Error(res.statusText)

    return res
  }
}