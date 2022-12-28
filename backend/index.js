const express = require('express')
const app = express()
require('./DB/config')
const user = require('./DB/user')
const cors = require('cors')
const { find, findOne, updateOne } = require('./DB/user')
const product = require('./DB/product')
app.use(express.json())
app.use(cors())


/*Sign-up*/
app.post("/signup", async (req, res) => {
    if (req.body.name && req.body.email && req.body.password) {
        let check = await user.findOne({ email: req.body.email })
        console.log(check)
        if (check) {
            res.send({ result: "User already exist" })
        } else {
            let details = new user(req.body)
            let result = await details.save();
            result = result.toObject()
            delete result.password
            res.send(result)
        }
    } else {
        res.send({ result: "Please enter details" })
    }
})

/*Login*/
app.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        let data = await user.findOne(req.body).select("-password")
        if (data) {
            res.send(data)
        } else {
            res.send({ result: "User not found" })
        }
    } else {
        res.send({ result: "Please enter details" })
    }
})

/*addProduct*/
app.post("/addProduct", async (req, res) => {
    let new_product = new product(req.body)
    let result = await new_product.save()
    res.send(result)
})

/*Get-product*/
app.get("/productList", async (req, res) => {
    let item = await product.find()
    res.send(item)
})

/*Delete-product*/
app.delete("/productList/:id", async (req, res) => {
    let result = await product.deleteOne({ _id: req.params.id })
    res.send(result)
})

/*Update-product*/
app.get("/updateProduct/:id", async (req, res) => {
    let result = await product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "Product not found" })
    }
})

app.put("/updateProduct/:id", async (req, res) => {
    let result = await product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result)
})

/*Search-Product*/
app.get("/search/:key", async (req, res) => {
    let result = await product.find(
        {
            "$or": [
                {
                    name: { $regex: req.params.key, $options: 'i' }
                    // ,$options: 'i' is for make the searching case-insesitive 
                },
                {
                    company: { $regex: req.params.key, $options: 'i' }
                }
            ]
        }
    )
    res.send(result)
})

const PORT = process.env.port || 5000
app.listen(PORT, () => {
    console.log("Server is running")
})