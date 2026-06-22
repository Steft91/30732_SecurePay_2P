/**
 * Separa la salida de notificaciones del proceso financiero para que el canal
 * de envío pueda sustituirse sin modificar las reglas de transferencia.
 */
class NotificationService {
  notifyTransfer(sender, receiver, amount) {
    this.notifyDebit(sender, amount);
    this.notifyCredit(receiver, sender.accountAlpha, amount);
  }

  notifyDebit(sender, amount) {
    console.log('\n--- [EMAIL OUTBOX] Enviando correo de confirmación ---');
    console.log(`Para: ${sender.email}`);
    console.log('Asunto: Débito por Transferencia Realizada - Fintech SecurePay');
    console.log(`Mensaje: Se ha debitado de su cuenta ${sender.accountAlpha} el valor de $${amount}.`);
    console.log(`Su nuevo saldo disponible es: $${sender.balance}.`);
    console.log('------------------------------------------------------\n');
  }

  notifyCredit(receiver, fromAccountId, amount) {
    console.log('\n--- [EMAIL OUTBOX] Enviando correo de recepción ---');
    console.log(`Para: ${receiver.email}`);
    console.log('Asunto: Crédito por Transferencia Recibida - Fintech SecurePay');
    console.log(`Mensaje: Ha recibido una transferencia de $${amount} de la cuenta ${fromAccountId}.`);
    console.log(`Su nuevo saldo disponible es: $${receiver.balance}.`);
    console.log('----------------------------------------------------\n');
  }
}

module.exports = NotificationService;
