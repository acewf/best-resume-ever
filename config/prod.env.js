require('dotenv').config();
module.exports = {
  NODE_ENV: '"production"',
  CONTACT_PHONE: `"${process.env.CONTACT_PHONE}"`,
  CONTACT_EMAIL: `"${process.env.CONTACT_EMAIL}"`,
  CONTACT_ADDRESS: `"${process.env.CONTACT_ADDRESS}"`
}
