const express = require('express')
const auth = require('../middlewares/auth')
const userController = require('../controllers/user');

let usrCon = new userController();

const router = express.Router()


router.route('/user/:username')
    .get(async (req, res) => {
    var username = req.params.username;
    try {
        const user = await usrCon.findOne({username:username})
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send({error: error.message})
    }})
    .put(async (req, res) => {
        var username = req.params.username;
        try {
            const user = await usrCon.update({username: username}, req.body)         
            res.status(200).send(user)
        } catch (error) {
            res.status(400).send({error: error.message})
    }})
    .delete(async (req, res) => {
        var username = req.params.username;
        try {
            const info = await usrCon.delete({username: username})            
            res.status(200).send(info)
        } catch (error) {
            res.status(400).send({error: error.message})
    }})


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