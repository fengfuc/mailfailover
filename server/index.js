const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello word'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
