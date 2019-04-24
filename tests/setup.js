const db = require("../server/models");
module.exports = async function() {
    global.__DB__ = db;
}