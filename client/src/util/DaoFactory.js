import { NegociacaoDao } from '../domain';
import { ConnectionFactory } from './';

/**
 * @returns {Promise<NegociacaoDao>}
 */
export async function getNegociacaoDao() {
  const conn = await ConnectionFactory.getConnection()
  
  return new NegociacaoDao(conn)
}
