/**
 * Concentra las reglas financieras previas a una transferencia para impedir
 * que se mezclen con persistencia, cálculo de saldos o transporte HTTP.
 */
class TransferValidationService {
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
  }

  validate(fromAccountId, toAccountId, amount) {
    const sender = this.accountRepository.findByAccountId(fromAccountId);
    if (!sender) {
      throw new Error(`Error de validación: La cuenta origen '${fromAccountId}' no existe en la base de datos.`);
    }

    const receiver = this.accountRepository.findByAccountId(toAccountId);
    if (!receiver) {
      throw new Error(`Error de validación: La cuenta destino '${toAccountId}' no existe en la base de datos.`);
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error('Error de validación: El monto a transferir debe ser un número mayor a cero.');
    }

    if (sender.accountAlpha === receiver.accountAlpha) {
      throw new Error('Error de validación: Las cuentas de origen y destino deben ser diferentes.');
    }

    if (sender.balance < amount) {
      throw new Error(`Saldo insuficiente: La cuenta '${fromAccountId}' tiene $${sender.balance}, requiere $${amount}.`);
    }

    return { sender, receiver };
  }
}

module.exports = TransferValidationService;
