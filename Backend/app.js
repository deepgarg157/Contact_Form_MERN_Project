const express = require("express")
const app = express()
const dotenv = require('dotenv')
require("./mongoDB/database")
const contact = require("./model/contact")
const bodyParser = require("body-parser")
const cors = require('cors')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// config
dotenv.config()

// route
// get all the contact details--------
app.get("/contact", async (req, res) => {
    try {
        const contacts = await contact.find()
        res.json({
            status: 'successful get all the details of contact',
            contacts
        })
    } catch (error) {
        res.json({
            status: 'Fail something went wrong....pls check it again',
            message: error.message
        })
    }
})

// create the new contact person-----------
app.post("/contact-details", async (req, res) => {
    try {
        const existingUser = await contact.findOne({ name: req.body.name })
        if (existingUser) {
            return res.json({
                message: 'User Contact already exists',
                data: null
            })
        }
        const contacts = await contact.create(req.body)
        res.status(200).json({
            status: 'New User contact deatils is successfully',
            contacts
        })
    }
    catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
})

// update the user contact list if its exist
app.patch('/contact-update/:id', async (req, res) => {
    try {
        const existUser = await contact.findById(req.params.id)

        if (!existUser) {
            res.json({
                status: 'User contact id not found, pls check again'
            })
        }

        const contacts = await contact.findByIdAndUpdate(req.params.id, req.body)
        res.json({
            status: 'user contact is updated successfully',
            contacts
        })
    }
    catch (error) {
        res.json({
            status: "Fail to update the user contact",
            message: error.message
        })
    }
})

// delete the user contact list if its exist
app.delete('/contact-delete/:id', async (req, res) => {
    try {
        const existUser = await contact.findById(req.params.id)
        
        if (!existUser) {
            res.json({
                status: 'User contact id not found, pls check again'
            })
        }

        const contacts = await contact.findByIdAndDelete(req.params.id, req.body)
        res.json({
            status: 'user contact is deleted successfully'
        })
    }
    catch (error) {
        res.json({
            status: "Fail to delete the user contact",
            message: error.message
        })
    }
})

const port = process.env.port || 1000
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})