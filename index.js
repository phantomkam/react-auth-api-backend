const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoute = require('./routes/auth');
const noteRoute = require('./routes/note.routes.js');

const MONGO_USERNAME = 'doapps-124630fd-2093-429f-a075-52c54f1ad586';
const MONGO_PASSWORD = '9iA521TR83ESh4O6';
const MONGO_HOSTNAME = 'db-mongodb-nyc3-21958-b7113ed8.mongo.ondigitalocean.com';
const MONGO_PORT = '27017';
const MONGO_DB = 'react-fais';

const dbURI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api', noteRoute);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on("error", (err) => { console.error(err) })
db.once("open", () => { console.log("DB started successfully") })

app.listen(2400, () => { console.log("Server started: 2400") })