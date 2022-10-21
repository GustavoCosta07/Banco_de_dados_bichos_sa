require("dotenv").config()
const express = require('express')
const cors = require('cors')
const routes = require('./config/RoutesPets')
const routesUsers = require('./config/RoutesUsers')
const app = express()
app.use(express.json()) //o que é ? 
app.use(cors())
app.use(routes)
app.use(routesUsers)

app.listen(3000, () =>{
    console.log(`Express started at http://localhost: 3000`)
})
