const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cors = require('cors');
const path = require('path')
const connectDataBase = require('./config/connnectDataBase');

connectDataBase()

const user = require('./routes/user')

app.use(express.json());
app.use(cors());
app.use('/api/user', user)

app.listen(process.env.PORT, () => {
    console.log(`Server listening ${process.env.PORT} is going in ${process.env.NODE_ENV_NAME}`)
})