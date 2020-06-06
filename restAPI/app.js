const express = require('express')
require('dotenv').config()
require("./db");

const userRouter = require('./routes/user')
const productRouter = require('./routes/product')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(productRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
  })
