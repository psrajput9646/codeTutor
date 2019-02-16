require('dotenv').config()

module.exports = {
    'secret': process.env.SECRET,
    'DATABASE_URL': process.env.DATABASE_URL
};