const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoute = require('./routes/auth');
const noteRoute = require('./routes/note.routes.js');
const dbURI = "mongodb+srv://fais:0501484127@cluster0.sunpt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(dbURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
})

const db = mongoose.connection
db.on("error", (err) => { console.error(err) })
db.once("open", () => { console.log("DB started successfully") })

app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api', noteRoute);
app.listen(3000, () => { console.log("Server started: 3000") })