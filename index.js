const ssbClient = require('ssb-client')
const express = require('express')
const port = 8080

let app = express()
let sbot

app.set('views', './views')


ssbClient(function(err, client) {
  sbot = client
})

app.use(express.static('public'))
app.get('/invite', function (req, response) {

  let uses = req.query.uses | 1

  inviteConfig = {
    'uses': uses
  }

  sbot.invite.create(inviteConfig, function(err, inviteCode) {
    if (err) {
      response.send(err)
    } else {
      response.send({'inviteCode': inviteCode, 'uses': uses})
    }
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
