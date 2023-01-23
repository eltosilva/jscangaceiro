import { View } from './View';

export class MensagemView extends View {

  /**
   * @param {Mensagem} model 
   * @returns {string}
   */
  template(model) {
    return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`
  }


}