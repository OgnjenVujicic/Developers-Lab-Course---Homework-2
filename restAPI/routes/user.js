const express = require('express')
const User = require('../models/user')
const auth = require('../middlewares/auth')
const userController = require('../controllers/user');

let usrCon = new userController();

const router = express.Router()

router.post('/user', async (req, res) => {
    try {
        const user = await usrCon.create(req.body)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.post('/user/login', async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await usrCon.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send({error: error.message})
    }

})

router.get('/user/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
})

router.get('/users', async (req, res) => {
    const users = await usrCon.findAll()
    res.status(200).send(users)
  })

module.exports = router