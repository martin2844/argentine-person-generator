const csvToJson = require('convert-csv-to-json');
const axios = require("axios");
const logger = require("../utils/logger")(module);
const generateRandomProfile = async () => {

        const capitalize = (s) => {
            if (typeof s !== 'string') return ''
            let newString = s.toLowerCase();
            return newString.charAt(0).toUpperCase() + s.slice(1)
        }

        try {
            
        const start = Date.now();
        //First create empty arrays to store our individual objects
        let names = [];
        let jobs = [];
        let foods = [];
        //Create JSON files to loop over
        let namesJSON = csvToJson.fieldDelimiter(',').getJsonFromCsv("./public/nombres.csv");
        let jobsJSON = csvToJson.fieldDelimiter(",").getJsonFromCsv("./public/profesiones.csv");
        let foodsJSON = csvToJson.fieldDelimiter(",").getJsonFromCsv("./public/comidas.csv");
        //Actually loop over and push to arrays
        for(let i=0; i<namesJSON.length;i++){
            names.push(namesJSON[i]);
        }
        for(let i=0; i<jobsJSON.length;i++){
            jobs.push(jobsJSON[i]);
        }
        for(let i=0; i<foodsJSON.length;i++){
            foods.push(foodsJSON[i]);
        }
        //Name indexes
        let randomNameIndex = Math.floor(Math.random() * namesJSON.length);
        let randomSirnameIndex = Math.floor(Math.random() * namesJSON.length);
        let FirstName = names[randomNameIndex].Nombre;
        let LastName = names[randomSirnameIndex].Apellido;
        //If we get an empty Sirname, choose another one
        while(LastName.length === 0) {
            LastName = names[Math.floor(Math.random() * namesJSON.length)].Apellido;
            console.log("while")
        }
        //Job Index
        let randomJobIndex = Math.floor(Math.random() * jobsJSON.length);
        let job = jobs[randomJobIndex].Profesion;
        
        while(job.length <= 3) {
            job = jobs[Math.floor(Math.random() * 551)].Profesion;
            console.log("while")
        }
        //Food indexes
        let randomFoodIndex = Math.floor(Math.random() * foodsJSON.length);
        let food = foods[randomFoodIndex].Comidas;

        let randomURL = await axios.get('https://source.unsplash.com/random/150x150').then((response) => {
        console.log("function triggered")
        return response.request.res.responseUrl;
        })
        

        return {
            person: {
                name: capitalize(FirstName),
                lastName: capitalize(LastName),
                job: job,
                food: food,
                picture: randomURL || "https://images.unsplash.com/photo-1599619586332-f85a328a9e13?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&ixlib=rb-1.2.1&q=80&w=150"
            },
            time: (Date.now() - start)
        }
        } catch (error) {
            logger.error(error);
            return error;
        }

}

module.exports = generateRandomProfile