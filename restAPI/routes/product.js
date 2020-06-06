const express = require('express')
const auth = require('../middlewares/auth')
const productController = require('../controllers/product');

let prodCon = new productController();

const router = express.Router()

router.route('/product/:name')
    .get(auth,async (req, res) => {
    var name = req.params.name;
    try {
        const user = await prodCon.findOne({name:name})
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
        var name = req.params.name;
        try {
            const user = await prodCon.update({name:name}, req.body)         
            res.status(200).send(user)
        } catch (error) {
            res.status(400).send({error: error.message})
    }})
    .delete(auth,async (req, res) => {
        var name = req.params.name;
        try {
            const info = await prodCon.delete({name:name})            
            res.status(200).send(info)
        } catch (error) {
            res.status(400).send({error: error.message})
    }})

router.post('/product', auth, async (req, res) => {
    doc = req.body
    doc.user = req.user._id
    try {
        const product = await prodCon.create(doc)
        res.status(201).send(product)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.get('/products', auth, async (req, res) => {
    const products = await prodCon.findAll()
    res.status(200).send(products)
})

module.exports = router