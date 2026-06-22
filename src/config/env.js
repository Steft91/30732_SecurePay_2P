require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  sentryDsn: process.env.SENTRY_DSN
};
