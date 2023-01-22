import { ProxyFactory } from './ProxyFactory.js'

export class Bind {
  
  /**
   * 
   * @param {Object} model 
   * @param {View} view 
   * @param {Array<string>} props 
   */
  constructor(model, view, ...props){
    const proxy = ProxyFactory.create(model, props, model => view.update(model))

    view.update(model)

    return proxy
  }
}