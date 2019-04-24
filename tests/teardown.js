module.exports = async function() {
    await global.__DB__.sequelize.close();
}