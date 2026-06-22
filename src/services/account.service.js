/**
 * Encapsula las consultas de cuentas y presenta únicamente la información
 * necesaria, delegando el acceso a datos al repositorio inyectado.
 */
class AccountService {
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
  }

  getBalance(accountId) {
    const account = this.accountRepository.findByAccountId(accountId);

    if (!account) {
      throw new Error(`La cuenta '${accountId}' no existe.`);
    }

    return {
      accountId: account.accountAlpha,
      email: account.email,
      balance: account.balance
    };
  }
}

module.exports = AccountService;
