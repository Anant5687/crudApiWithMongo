const express = require('express')
const users = require('../modals/userSchema')
const router = express.Router();


//Posting data
router.post('/form', async (req, res) => {
    const { name, email, age, mobile, address, work, desc } = req.body

    if (!name || !email || !age || !mobile || !address || !work || !desc) {
        res.status(404).send("Please enter all require fields")
    }

    try {
        const preUser = await users.findOne({ email: email });
        console.log("18", preUser)

        if (preUser) {
            res.status(404).send("This user is already exists")
        } else {
            const addUser = new users({
                name, email, age, mobile, address, work, desc
            })

            await addUser.save()

            res.status(201).send(addUser)
            console.log("31", addUser)
        }
    } catch (error) {
        res.status(404).send(error)
    }
})

//Getting data

router.get('/', async (req, res) => {
    try {
        const getUser = await users.find()
        res.status(201).json(getUser)
    } catch (error) {
        res.status(404).json("No data is found")
    }
})

// Get Individual Data

router.get("/view/:id", async (req, res) => {
    try {
        const { id } = req.params
        const getIndividualData = await users.findById({ _id: id })
        console.log(getIndividualData)
        res.status(201).json(getIndividualData)

    } catch (error) {
        res.status(404).json(error)
    }
})

//Updating Route
router.put("/Edit/:id", async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const updateValue = await users.findByIdAndUpdate(id, req.body, {
            new: true
        })

        res.status(201).json(updateValue)
    } catch (error) {
        res.status(404).json(error)
    }
})


//Delete Id

router.delete("/deleteUser/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteUser = await users.findByIdAndDelete({ _id: id })
        res.status(201).json(deleteUser)
    } catch (error) {
        res.status(404).json(error)
    }
})
module.exports = router;