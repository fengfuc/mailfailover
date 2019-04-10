const Mail = require("./MailServices")
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/../client/dist/spa-mat'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/../client/dist/spa-mat', 'index.html')))

app.post('/api/sendmail', (req, res) => {
    Mail.sendMail_sendgrid(req.body, 1, (err, data) => {
        err ? res.json({ status: 'failed' }) : res.json({ status: 'success', data: res.body })
    })
})

app.listen(port, () => console.log(`Mail app listening on port ${port}`))

