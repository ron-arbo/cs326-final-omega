let express = require('express');
let app = express()

express.use(express.static('public'))

app.listen(process.env.PORT || 8080, ()=>console.log('Good work'))