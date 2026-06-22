/**
 * Se ocupa exclusivamente del movimiento de saldos entre cuentas y recibe el
 * repositorio por constructor para mantener la inversión de dependencias.
 */
class BalanceService {
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
  }

  transfer(sender, receiver, amount) {
    const updatedSender = this.accountRepository.updateBalance(
      sender.accountAlpha,
      sender.balance - amount
    );
    const updatedReceiver = this.accountRepository.updateBalance(
      receiver.accountAlpha,
      receiver.balance + amount
    );

    return { sender: updatedSender, receiver: updatedReceiver };
  }
}

module.exports = BalanceService;
