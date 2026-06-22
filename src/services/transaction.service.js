/**
 * Coordina el caso de uso de transferencia mediante componentes inyectados;
 * no conoce implementaciones concretas de datos, validación o notificación.
 */
class TransactionService {
  constructor({
    validationService,
    balanceService,
    transactionRepository,
    transactionFactory,
    notificationService
  }) {
    this.validationService = validationService;
    this.balanceService = balanceService;
    this.transactionRepository = transactionRepository;
    this.transactionFactory = transactionFactory;
    this.notificationService = notificationService;
  }

  executeTransfer(fromAccountId, toAccountId, amount) {
    const accounts = this.validationService.validate(fromAccountId, toAccountId, amount);
    const updatedAccounts = this.balanceService.transfer(accounts.sender, accounts.receiver, amount);
    const transaction = this.transactionFactory.create(fromAccountId, toAccountId, amount);

    this.transactionRepository.save(transaction);
    this.notificationService.notifyTransfer(
      updatedAccounts.sender,
      updatedAccounts.receiver,
      amount
    );

    return {
      success: true,
      message: 'Transferencia ejecutada con éxito',
      transaction,
      balanceRestante: updatedAccounts.sender.balance
    };
  }
}

module.exports = TransactionService;
