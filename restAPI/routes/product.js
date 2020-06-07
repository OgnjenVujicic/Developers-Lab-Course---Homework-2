const express = require('express')
const auth = require('../middlewares/auth')
const productController = require('../controllers/product');
const userController = require('../controllers/user');

let prodCon = new productController();
let usrCon = new userController();

const router = express.Router()

function sendStatus(model, res){
    if(!model){
        res.status(404).send({error : "not found"})
    }
    else{
        res.status(200).send(model)
    }
}

router.route('/product/:name')
    .get(auth,async (req, res) => {
    var name = req.params.name;
    try {
        const product = await prodCon.findOne({name:name})
        sendStatus(product, res);
    } catch (error) {
        res.status(400).send({error: error.message})
    }})
    .put(auth,async (req, res) => {
        var name = req.params.name;
        try {
            const product = await prodCon.update({name:name}, req.body)    
            sendStatus(product, res);
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


router.route('/product_id/:_id')
    .get(auth,async (req, res) => {
    var id = req.params._id;
    try {
        const product = await prodCon.findOne({_id:id})
        sendStatus(product, res);
    } catch (error) {
        res.status(400).send({error: error.message})
    }})
    .put(auth,async (req, res) => {
        var id = req.params._id;
        try {
            const product = await prodCon.update({_id:id}, req.body)         
            sendStatus(product, res);
        } catch (error) {
            res.status(400).send({error: error.message})
    }})
    .delete(auth,async (req, res) => {
        var id = req.params._id;
        try {
            const info = await prodCon.delete({_id:id})            
            res.status(200).send(info)
        } catch (error) {
            res.status(400).send({error: error.message})
    }})


router.post('/product', auth, async (req, res) => {
    doc = req.body
    doc.user = req.user._id
    try {
        const product = await prodCon.create(doc)
        usrCon.sendMailToAdmins(product);
        res.status(201).send(product)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.get('/products', auth, async (req, res) => {
    try {
        const products = await prodCon.findPaginate(req.query.limit || 100, req.query.offset || 0)
        res.status(200).send(products)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.put('/product_dec/:_id', auth, async (req, res) => {
    id = req.params._id;
    try {
        prod = await prodCon.product_dec(id)
        res.status(200).send(prod)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.put('/product_inc/:_id', auth, async (req, res) => {
    id = req.params._id;
    try {
        prod = await prodCon.product_inc(id)
        res.status(200).send(prod)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.get('/product_num/:_id', auth, async (req, res) => {
    id = req.params._id;
    try {
        prod = await prodCon.product_num(id)
        res.status(200).send(prod)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.get('/product_profit', auth, async (req, res) => {
    const user = req.user;
    try {
        const prof = await prodCon.product_profit(user._id)
        res.status(200).send(prof)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})



module.exports = router