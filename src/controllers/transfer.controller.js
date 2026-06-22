/**
 * Adapta el endpoint de transferencias y delega el negocio al servicio
 * inyectado, manteniendo separadas las responsabilidades HTTP y financiera.
 */
class TransferController {
  constructor(transactionService) {
    this.transactionService = transactionService;
    this.executeTransfer = this.executeTransfer.bind(this);
  }

  executeTransfer(req, res, next) {
    if (req.body.simulateDbFailure === true) {
      return next(new Error('Conexión interrumpida con el Clúster de Datos SecurePay'));
    }

    try {
      const { fromAccountId, toAccountId, amount } = req.body;

      if (!fromAccountId || !toAccountId || amount === undefined) {
        return res.status(400).json({
          error: 'Petición incorrecta',
          message: 'Los campos fromAccountId, toAccountId y amount son requeridos en el cuerpo de la petición.'
        });
      }

      const result = this.transactionService.executeTransfer(
        fromAccountId,
        toAccountId,
        Number(amount)
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        error: 'Error en la transacción',
        message: error.message
      });
    }
  }
}

module.exports = TransferController;
