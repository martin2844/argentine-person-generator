const express = require("express");
const person = require("./controllers/person");
//initialize express.
const app = express();

//public dir
app.use('/public', express.static(__dirname + '/public'));
// Set view engine.
app.set("view engine", "ejs");


app.get("/api/generate", async (req, res) => {
    let gen = await person();
    console.log(gen);
    res.send(JSON.stringify(gen));
})

app.get("/", async (req, res) => {
    res.render('index', {title: "Generador de Personas"});
})


const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`server started on ${PORT}`));