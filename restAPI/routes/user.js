const express = require('express')
const auth = require('../middlewares/auth')
const userController = require('../controllers/user');

let usrCon = new userController();

const router = express.Router()


router.route('/user/:username')
    .get(auth,async (req, res) => {
    var username = req.params.username;
    try {
        const user = await usrCon.findOne({username:username})
        if(!user){
            res.status(404).send({error : "not found"})
        }
        else{
            res.status(200).send(user)
        }
    } catch (error) {
        res.status(400).send({error: error.message})
    }})
    .put(auth,async (req, res) => {
        var username = req.params.username;
        try {
            const user = await usrCon.update({username: username}, req.body)         
            res.status(200).send(user)
        } catch (error) {
            res.status(400).send({error: error.message})
    }})
    .delete(auth,async (req, res) => {
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

router.get('/me', auth, async(req, res) => {
    // View logged in user profile
    res.status(200).send(req.user)
})

router.get('/users', auth, async (req, res) => {
    const users = await usrCon.findAll()
    res.status(200).send(users)
  })

module.exports = router