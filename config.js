require('dotenv').config()

let envVars = process.env.DATABASE

console.log(envVars)

const database = envVars

console.log(database)

module.exports = database