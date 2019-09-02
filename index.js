const ssbClient = require('ssb-client')
const express = require('express')
const port = 8080

let app = express()

let ssb;

ssbClient(function(err, sbot) {
  ssb = sbot;
});

app.use(express.static('public'))

app.get('/invite', function (req, response, next) {
  try {
    let uses = req.query.uses || 1

    ssb.invite.create({'uses': uses}, function(err, inviteCode) {
      if (err) {
        next(err)
      } else {
        console.log(`[${new Date().toISOString()}]: Generated ${uses} invites`)
        response.send({'inviteCode': inviteCode, 'uses': uses})
      }
    })
  } catch (err) {

    ssbClient(function(err, sbot) {
      ssb = sbot;
    })
    
    next(err)
  }
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send({'error': "Invite generation failed!"}) })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
