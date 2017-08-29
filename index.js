const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes')

const app = express()

app.use(bodyParser.json({ type: '*/*' }))
app.use(morgan('combined'))
app.use(cors())
app.use('/api', routes)

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`Gday mate. Listening on port ${port}`))
