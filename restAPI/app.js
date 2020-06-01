const express = require('express')
require('dotenv').config()
require("./db");
const User = require('./controllers/user');
const Product = require('./controllers/product');
const userRouter = require('./routes/user')

const app = express()

app.use(express.json())
app.use(userRouter)
/*
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users)
})



app.post('/user', async (req, res) => {
  const userToCreate = req.body.data;
  try {
    const user = await User.create(userToCreate)
    res.status(201).json(user)
  } catch (error) {
    console.log(error);
    res.json(error)
  }
}) 

app.post('/product', async (req, res) => {
    const productToCreate = req.body.data;
    try {
      const product = await Product.create(productToCreate)
      res.status(201).json(product)
    } catch (error) {
      console.log(error);
      res.json(error)
    }
  })*/

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
  })
