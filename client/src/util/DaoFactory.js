import { NegociacaoDao } from '../domain/negociacao/NegociacaoDao.js';
import { ConnectionFactory } from './ConnectioFactory.js';

/**
 * @returns {Promise<NegociacaoDao>}
 */
export async function getNegociacaoDao() {
  const conn = await ConnectionFactory.getConnection()
  
  return new NegociacaoDao(conn)
}
