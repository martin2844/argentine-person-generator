const express = require("express");
const router = express.Router();
const person = require("../controllers/person");


router.get("/", async (req, res) => {
    //Get Queries from url
    let {amount, image} = req.query;
    //Parse the integer from the string query
    amount = parseInt(amount);
    //If there is no amount, default to just one.
    if(amount === undefined || Number.isNaN(amount)){
        try {
            //Check for image bool. If false do not query for image.
            if(image) {
                let gen = await person(image);
                res.send(JSON.stringify(gen));
            } else {
                let gen = await person();
                res.send(JSON.stringify(gen));
            }
         
        } catch (error) {
            res.send(error);
        }
      
    } else {
        try {
            //If there is an amount of people defined, set max amount to 100.
            if(amount > 100) {
                amount = 100;
            }
            //initialize array of promises
            let promises = [];
            //Check for image bool.
            if(image) {
                for (let i = 0; i < amount; i++) {
                    let newPerson = await person(image);
                    promises.push(newPerson);
                }
            } else {
                for (let i = 0; i < amount; i++) {
                    let newPerson = await person();
                    promises.push(newPerson);
                }
            }
            //return the resolve of all the promises
            return await Promise.all(promises).then(() => {
                res.status(200).send(promises);
            });
        } catch (error) {
            //If there is an error -->
            res.status(500).send(error);
        }
    }
})






module.exports = router;