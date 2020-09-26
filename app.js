const express = require("express");
const person = require("./controllers/person");
//initialize express.
const app = express();

//public dir
app.use('/public', express.static(__dirname + '/public'));

// Set view engine.
app.set("view engine", "ejs");


app.get("/api/generate", async (req, res) => {
    let {amount, image} = req.query;
    amount = parseInt(amount);
    if(amount === undefined || Number.isNaN(amount)){
        try {
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
            if(amount > 100) {
                amount = 100;
            }
            let promises = [];
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
 
            return await Promise.all(promises).then(() => {
                res.send(promises);
            });
        } catch (error) {
            
        }
    }
 
 
})

app.get("/", async (req, res) => {
    res.render('index', {title: "Generador de Personas"});
})

app.get("/docs", async (req, res) => {
    res.render('apidocs', {title: "Generador de Personas - docs"});
})

app.get("/about", async (req, res) => {
    res.render('about', {title: "Generador de Personas - About"});
})

const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`server started on ${PORT}`));