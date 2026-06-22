/**
 * Centraliza la persistencia del historial y evita que el flujo de
 * transferencias conozca cómo se almacenan las transacciones.
 */
class TransactionRepository {
  constructor(transactions) {
    this.transactions = transactions;
  }

  save(transaction) {
    this.transactions.push(transaction);
    return transaction;
  }

  findAll() {
    return [...this.transactions];
  }
}

module.exports = TransactionRepository;
