var ssbClient = require('ssb-client')
var express = require('express')
const port = 3000


var app = express()

var sbot

ssbClient(function(err, client) {
  sbot = client
})


app.get('/', function (req, response) {

  inviteConfig = {
    'uses': 1,
    'external': 'pub.planetary.computer'
  }

  sbot.invite.create(inviteConfig, function(err, invite) {
    if (err) {
      response.send(err)
    } else {
      response.send(invite)
    }
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
