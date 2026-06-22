const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const PRIVATE_KEY_PATH = path.join(__dirname, '../../private.pem');
const PUBLIC_KEY_PATH = path.join(__dirname, '../../public.pem');

function readKey(keyPath) {
  return fs.readFileSync(keyPath, 'utf8');
}

/**
 * Firma únicamente los claims de identidad requeridos con la clave privada.
 * La expiración corta reduce el tiempo de uso posible de un token comprometido.
 */
function signToken(user) {
  if (!user || typeof user !== 'object') {
    throw new TypeError('Se requiere un usuario para generar el token.');
  }

  const subject = user.sub || user.id;
  if (!subject || !user.name) {
    throw new TypeError("El usuario debe incluir los claims 'sub' (o 'id') y 'name'.");
  }

  const payload = {
    sub: String(subject),
    name: String(user.name)
  };

  return jwt.sign(payload, readKey(PRIVATE_KEY_PATH), {
    algorithm: 'RS256',
    expiresIn: '2m'
  });
}

/**
 * Verifica la firma y expiración usando exclusivamente la clave pública y
 * restringe explícitamente los algoritmos aceptados para impedir downgrades.
 */
function verifyToken(token) {
  return jwt.verify(token, readKey(PUBLIC_KEY_PATH), {
    algorithms: ['RS256']
  });
}

module.exports = {
  signToken,
  verifyToken
};
