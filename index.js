const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoute = require('./routes/auth');
const noteRoute = require('./routes/note.routes.js');

const dbURI = "mongodb+srv://<doadmin>:<9iA521TR83ESh4O6>@<db-mongodb-nyc3-21958-b7113ed8.mongo.ondigitalocean.com>/test?retryWrites=true&w=majority";
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api', noteRoute);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on("error", (err) => { console.error(err) })
db.once("open", () => { console.log("DB started successfully") })

app.listen(2400, () => { console.log("Server started: 2400") })