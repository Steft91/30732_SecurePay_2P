const database = require('../data/in-memory.database');
const AccountRepository = require('../repositories/account.repository');
const TransactionRepository = require('../repositories/transaction.repository');
const AccountService = require('../services/account.service');
const BalanceService = require('../services/balance.service');
const NotificationService = require('../services/notification.service');
const TransactionFactoryService = require('../services/transaction-factory.service');
const TransactionService = require('../services/transaction.service');
const TransferValidationService = require('../services/transfer-validation.service');
const AccountController = require('../controllers/account.controller');
const TransferController = require('../controllers/transfer.controller');

const accountRepository = new AccountRepository(database.users);
const transactionRepository = new TransactionRepository(database.transactions);

const accountService = new AccountService(accountRepository);
const balanceService = new BalanceService(accountRepository);
const validationService = new TransferValidationService(accountRepository);
const notificationService = new NotificationService();
const transactionFactory = new TransactionFactoryService();

const transactionService = new TransactionService({
  validationService,
  balanceService,
  transactionRepository,
  transactionFactory,
  notificationService
});

module.exports = {
  accountController: new AccountController(accountService),
  transferController: new TransferController(transactionService)
};
