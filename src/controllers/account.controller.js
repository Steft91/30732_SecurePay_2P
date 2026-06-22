/**
 * Adapta las peticiones HTTP de cuentas y recibe su caso de uso por
 * constructor, evitando crear dependencias concretas dentro del controlador.
 */
class AccountController {
  constructor(accountService) {
    this.accountService = accountService;
    this.getBalance = this.getBalance.bind(this);
  }

  getBalance(req, res) {
    try {
      const accountId = req.query.accountId;

      if (!accountId) {
        return res.status(400).json({
          error: 'Petición incorrecta',
          message: 'Debe proporcionar un parámetro accountId por query string (ej: ?accountId=ACC-12345).'
        });
      }

      const accountInfo = this.accountService.getBalance(accountId);
      return res.status(200).json(accountInfo);
    } catch (error) {
      return res.status(404).json({
        error: 'Recurso no encontrado',
        message: error.message
      });
    }
  }
}

module.exports = AccountController;
