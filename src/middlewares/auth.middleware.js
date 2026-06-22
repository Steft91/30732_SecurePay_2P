const jwtService = require('../services/jwt.service');

/**
 * Protege cada microservicio de forma stateless: extrae el Bearer token,
 * delega su validación criptográfica y adjunta la identidad verificada.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'Acceso no autorizado',
      message: 'Falta la cabecera Authorization en la petición.'
    });
  }

  const bearerMatch = authHeader.match(/^Bearer\s+([^\s]+)$/i);
  if (!bearerMatch) {
    return res.status(401).json({
      error: 'Acceso no autorizado',
      message: 'Formato de cabecera de autenticación debe ser Bearer <token>.'
    });
  }

  const token = bearerMatch[1];

  try {
    req.user = jwtService.verifyToken(token);
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expirado',
        message: 'La sesión ha expirado. Genere un nuevo token.'
      });
    }

    if (error.name === 'JsonWebTokenError' || error.name === 'NotBeforeError') {
      return res.status(403).json({
        error: 'Token inválido',
        message: 'La firma o estructura del token no es válida.'
      });
    }

    return next(error);
  }
}

module.exports = authMiddleware;
