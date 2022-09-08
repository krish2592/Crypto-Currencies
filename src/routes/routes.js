const express = require('express');
const router = express.Router();
const {listOfTransaction,updatedPrice,getPrice}= require("../controllers/etherium")

router.get("/user/list/transaction",listOfTransaction);
router.get("/user/price/etherium",updatedPrice);
router.get("/user/price", getPrice )

module.exports = router;
