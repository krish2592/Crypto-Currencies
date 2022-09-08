const axios = require("axios");
const transactionModel = require("../models/crypto")

const apikey="AKVA2G2E7ZM6I2ZIFJJ92HI3QAD766AP7S";

const listOfTransaction = async function (req, res) {
    try{
    let address = req.query.address;
    if(!address){
        return res.status(400).send({ "status": false, "message": `${address} is required` });
    }

    let option = {
        method: 'get',
        url: `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apikey}`,

    }

    let userTransactionDetail = await axios(option);

    if(userTransactionDetail.data.result.length==0){
        return res.status(400).send({ "status": false, "message": `No transaction found` });
    }

    let resData = await transactionModel.findOneAndUpdate({address: address },{data: userTransactionDetail.data});
    if(!resData){
        return res.status(400).send({ "status": false, "message": "No document found" });
    }
    return res.status(200).send({ "status": true, "data": resData });
} 
catch(err){
    return res.status(500).send({ "status": false, "err": err.message });
}
}
let arr=[];
const updatedPrice = async function (req, res) {
    try{
        setInterval(() => {
            axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr`)
                .then(function (response) {
                    arr[0]=response.data;
                }
                )
                .catch(function(err){
                    return res.send({ status: false, err: err.message })
                })
               
        }, 1000*60*10);

    if(arr.length>0){
        return res.status(200).send({price:arr[0]})
    } else {
        axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr`)
        .then(function(response){
            return res.status(200).send({price:response.data})
        })
    }
 }
 catch(err){
    return res.status(500).send({ "status": false, "err": err.message });
 }
}


const getPrice = async function (req, res) {
    try{
    let address = req.query.address;
    if(!address){
        return res.status(400).send({ "status": false, "message": `${address} is required` });
    }

    let currPrice = {
        method: 'get',
        url: `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr`

    }

    let currBalance = {
        method: 'get',
        url: `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apikey}`

    }

    let priceResponse = await axios(currPrice);
    let price = priceResponse.data
    let balanceResponse = await axios(currBalance)
    let balance = balanceResponse.data.result;
    return res.status(200).send({ status: true, address: address, data: { balance: balance, price: price } })
} 
catch(err){
    return res.status(500).send({ "status": false, "err": err.message });
}
}

module.exports = { listOfTransaction, updatedPrice, getPrice };