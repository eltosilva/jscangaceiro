export function controller(...seletores) {

  const elementos = seletores.map(seletor => document.querySelector(seletor))

  return function (constructor) {
    const construtorOriginal = constructor

    const construtorNovo = function() {
      const instancia = new construtorOriginal(...elementos)

      Object
        .getOwnPropertyNames(construtorOriginal.prototype)
        .forEach(property => {
          if(Reflect.hasMetadata('bindEvent', instancia, property)){
            associaEvento(instancia, Reflect.getMetadata('bindEvent', instancia, property))
          }
        })
    }

    construtorNovo.prototype = construtorOriginal.prototype

    return construtorNovo
  }
}

function associaEvento(instance, metadado){
  document
    .querySelector(metadado.selector)
    .addEventListener(metadado.event, event => {
      if(metadado.prevent)
        event.preventDefault()
      instance[metadado.propertyKey](event)
    })
}