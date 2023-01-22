import { NegociacaoDao } from '../domain/negociacao/NegociacaoDao.js';
import { ConnectionFactory } from './ConnectioFactory.js';

/**
 * @returns {Promise<NegociacaoDao>}
 */
export function getNegociacaoDao() {
  return ConnectionFactory
    .getConnection()
    .then(conn => new NegociacaoDao(conn))
}
