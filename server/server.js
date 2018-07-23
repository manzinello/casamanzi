const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const request = require('request');
const schedule = require('node-schedule');

const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');
const button = new Gpio(4, 'in', 'both');

const REQUEST_OK = 200;
const ERROR = "error";
const router = express.Router()

const staticFiles = express.static(path.join(__dirname, '../../client/build'))

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(staticFiles)

router.get('/casamanzi', (req, res) => {
  const controlla = {
    value: "casamanzi!"
  }
  res.json(controlla)
})

app.use(router)

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles)
app.set('port', (process.env.PORT || 3001))

app.listen(app.get('port'), () => {

  console.log(`listening on ${app.get('port')}`);

  /*
  button.watch(function (err, value) {
    led.writeSync(value);
  });
  */

})