const { randomUUID } = require('crypto');

/**
 * Construye registros de transacción uniformes y libera al orquestador de la
 * responsabilidad de generar identificadores y metadatos.
 */
class TransactionFactoryService {
  create(fromAccountId, toAccountId, amount) {
    return {
      transactionId: `TX-${randomUUID()}`,
      from: fromAccountId,
      to: toAccountId,
      amount,
      status: 'COMPLETED',
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = TransactionFactoryService;
