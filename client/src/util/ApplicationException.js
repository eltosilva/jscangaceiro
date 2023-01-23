export class ApplicationException extends Error {
  
  constructor(msg = '') {
    super(msg)
    this.name = this.constructor.name
  }
}

const exception = ApplicationException

export function isApplicationExcetpion(err){
  return err instanceof exception || Object.getPrototypeOf(err) instanceof exception
}

export function getExceptionMessage(err){
  if(isApplicationExcetpion(err))
    return err.message
  else{
    console.error(err)
    return 'Não foi possível realizar a operação'
  }
}