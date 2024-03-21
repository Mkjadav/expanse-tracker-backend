const fetchuser = require('../middleware/fetchuser');
const router = require('express').Router();
const Income = require('../models/incomeModule')
const Expense = require("../models/ExpenseModule")
const { validationResult } = require('express-validator');
const { response } = require('express');

// get income
router.get('/get-incomes', fetchuser, async (req, res) => {
    try {
        const Incomes = await Income.find({ user: req.user.id })
        res.status(200).json(Incomes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// add income
router.post("/add-income", fetchuser, async (req, res) => {

    try {
        const { title, amount, description, category, date } = req.body;
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (!title || !amount || !description || !category) {
            return res.status(404).json({ msg: "All fields are require ! " })
        } if (amount <= 0 || amount === "number") {
            return res.status(404).json({ msg: "Amount must be a positive " })
        }

        const income = new Income({
            title,
            amount,
            description,
            date,
            category,
            user: req.user.id
        })
        await income.save()
        // console.log(income)
        res.status(200).json({ msg: " income Successfully added" })
    } catch (error) {
        res.status(500).json({ msg: "Server Error" })
    }
}
);

// delete income
router.delete("/delete-income/:id", fetchuser, async (req, res) => {
    const { id } = req.params
    Income.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({ msg: "income deleted" })
        })
        .catch((err) => {
            res.status(500).json({ msg: "Server Error" })

        })
})

// /////////////////////////////////////////expense

// get expense
router.get('/get-expenses', fetchuser, async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id })
        res.status(200).json(expenses)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})



// add expense
router.post("/add-expense", fetchuser, async (req, res) => {
    const { title, amount, description, category, date } = req.body;
    const expense = new Expense({
        title,
        amount,
        description,
        date,
        category,
        user: req.user.id
    })

    try {
        const { title, amount, description, category, date } = req.body;
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (!title || !amount || !description || !category) {
            return res.status(404).json({ msg: "All fields are require ! " })
        } if (amount <= 0 || amount === "number") {
            return res.status(404).json({ msg: "Amount must be a positive " })
        }


        await expense.save()
        res.status(200).json({ msg: " expense Successfully added" })
    } catch (error) {
        res.status(500).json({ msg: "Server Error" })
    }
}
);

// delete income
router.delete("/delete-expense/:id", fetchuser, async (req, res) => {
    const { id } = req.params
    Expense.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({ msg: "expense deleted" })
        })
        .catch((err) => {
            res.status(500).json({ msg: "Server Error" })

        })
})


module.exports = router;