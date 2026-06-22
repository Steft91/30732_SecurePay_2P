/**
 * Aísla el acceso y la actualización del estado de las cuentas para que la
 * lógica de negocio no dependa directamente del almacenamiento en memoria.
 */
class AccountRepository {
  constructor(users) {
    this.users = users;
  }

  findByAccountId(accountId) {
    return this.users.find((user) => user.accountAlpha === accountId);
  }

  updateBalance(accountId, newBalance) {
    const account = this.findByAccountId(accountId);

    if (!account) {
      throw new Error(`La cuenta '${accountId}' no existe.`);
    }

    account.balance = newBalance;
    return account;
  }
}

module.exports = AccountRepository;
