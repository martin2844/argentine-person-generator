const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.render('index', {title: "dame1 - generador de personas"});
})

router.get("/docs", async (req, res) => {
    res.render('apidocs', {title: "dame1 - docs"});
})

router.get("/about", async (req, res) => {
    res.render('about', {title: "dame1 - About"});
})








module.exports = router;