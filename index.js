const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoute = require('./routes/auth');
const noteRoute = require('./routes/note.routes.js');

const dbURI = "mongodb+srv://fais:0501484127@cluster0.sunpt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api', noteRoute);

mongoose.connect(dbURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
})
const db = mongoose.connection

db.on("error", (err) => { console.error(err) })
db.once("open", () => { console.log("DB started successfully") })

app.listen(3000, () => { console.log("Server started: 3000") })