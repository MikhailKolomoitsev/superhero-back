require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const router = require('./routes')
const path = require('path')

dotenv.config()

const PORT = process.env.PORT || 4999
const uriDb = process.env.DB_HOST

const app = express()
app.use(
    cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }),
);

app.use(express.json())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(fileUpload({}))
app.use('/api', router)

const connection = mongoose.connect(uriDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

connection
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running, DB is connected. Use our API on port: ${PORT}`)
        })
    })
    .catch((err) =>
        console.log(`Server not running. Error message: ${err.message}`),
    )
