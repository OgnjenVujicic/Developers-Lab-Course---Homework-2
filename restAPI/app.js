const express = require('express')
const { json, urlencoded } = require('body-parser')

const connect = require("./helpers").connect;
const User = require('./controllers/user');
const Product = require('./controllers/product');

const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())

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
  })

connect('mongodb://localhost:27017/database')
  .then(() => app.listen(3000, () => {
    console.log('server on http://localhost:3000')
  }))
  .catch(e => console.error(e))
