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

  let uses = req.query.uses || 1

  sbot.invite.create({'uses': uses}, function(err, inviteCode) {
    if (err) {
      console.log(err)
      response.send(err)
    } else {
      console.log(`[${new Date().toISOString()}]: Generated ${uses} invites`)
      response.send({'inviteCode': inviteCode, 'uses': uses})
    }
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
