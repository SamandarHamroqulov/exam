const { default: mongoose } = require("mongoose");
const { globalError } = require("shokhijakhon-error-handler");

async function dbconnection() {
    try {
        mongoose.connect(process.env.dbUri)
        console.log("Db succesfully connected");
        
        
    } catch (err) {
        return globalError(err ,res)
        
    }
}
module.exports = dbconnection