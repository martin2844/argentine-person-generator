const express = require("express");
const logger = require("./utils/logger")(module);
//initialize express.
const app = express();

//public dir
app.use('/public', express.static(__dirname + '/public'));

// Set view engine.
app.set("view engine", "ejs");

//Api Routes
app.use("/api/generate", require("./routes/generate"));

//Views routes
app.use("/", require("./routes/views"));


const PORT = process.env.PORT || 9000;
app.listen(PORT, logger.info(`server started on ${PORT}`));