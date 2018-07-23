const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const request = require('request');
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;
const schedule = require('node-schedule');
const _ = require('lodash');
const URL = require('url-parse');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

const router = express.Router()

const staticFiles = express.static(path.join(__dirname, '../../client/build'))

app.use(staticFiles)

router.get('/controlla', (req, res) => {
  const controlla = {
    value: "controllasubito!"
  }
  res.json(controlla)
})

app.use(router)

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles)
app.set('port', (process.env.PORT || 3001))

const REQUEST_OK = 200;
const ERROR = "error";
const ARTICLE_DOM = "article";
const DATA_ID = "data-id";
const IMG_DOM = "img";
const SRC_DOM = "src";
const HREF_DOM = "href";
const H2_DOM = "h2";
const A_DOM = "a";
const ITEM_PRICE_DOM = "item_price";
const TIME_DOM = "time";
const DATETIME_DOM = "datetime";

// MailGun
var mailgun = require("mailgun-js");
var api_key = 'key-f5ecad697c8908b0956732c39744b74f';
var DOMAIN = 'sandbox96ee8c891b8b455c9b18e8ee6645c5e2.mailgun.org';
var mailgun = require('mailgun-js')({
  apiKey: api_key,
  domain: DOMAIN
});
var defaultFrom = "controllasubito <controllasubito@gmail.com>";

// main vars
var jobs = new Array();
var controllas = new Array();

app.listen(app.get('port'), () => {

  console.log(`listening on ${app.get('port')}`);

  // Test
  // controlla("https://www.subito.it/annunci-lombardia/vendita/usato/?q=macintosh&qso=true", (a) => console.log(a[10].id.toString()));

  // Test
  // mail([10, 12], "matteomanzinello@gmail.com")

  // Test di un Controlla alle 14:30 di ogni giorno

  /*
  var test = new Controlla('0 30 14 * * *', 'matteomanzinello@gmail.com', 'https://www.subito.it/annunci-lombardia/vendita/usato/?q=vespa&qso=true');

  test.printLastArray();

  setTimeout(() => test.printLastArray(), 3000);

  var testJob = startJob(test);

  console.log("finished the initialization of the jobs!");
  */

})

// class Article
class Article {

  constructor(id = null, name = '', price = '', url = '', img = '', time = '') {
    this.id = id;
    this.name = name;
    this.price = price;
    this.url = url;
    this.img = img;
    this.time = time;

  }

}

// class Controlla
class Controlla {

  constructor(schedule, email, url) {

    this.schedule = schedule;
    this.email = email;
    this.url = url;

    // Inizializzazione dell'array degli ID
    controlla(this.url, arts => {
      this.lastArray = arts
    });

  }

  printLastArray() {
    console.log(this.lastArray);
  }

}

function startAllJobs() {
  jobs.forEach((job) => {
    startJob(job);
  });
}

function closeAllJobs() {
  jobs.forEach((job) => {
    job.cancel();
  })
}

function startJob(c) {

  console.log("startJob called!");

  // inizializzo il job
  var j = schedule.scheduleJob(c.schedule, () => {

    console.log("job started!");

    // chiamo il metodo principale di controllasubito
    controlla(c.url, arts => {

      // popolo d con l'array differenza tra i due array
      var d = checkDifferenceSlice(c.lastArray, arts);

      // switch tra le opzioni su d
      if (thereAreNewArticles(d)) {

        console.log("Ci sono nuovi articoli!");

        // Invio l'email con l'Array differenza
        mail(d, c.email);

        // Aggiorno il nuovo lastArray con il nuovo array
        c.lastArray = arts;

      } else {

        console.log("Non ci sono nuovi articoli!");

      }

    })

  });

  return j;

}

function subitoUrl(url) {
  if (url)
    return true;
  else return false;
}

function okUrl(url) {
  return true;
}

function thereAreNewArticles(array) {
  return array.length != 0;
}

function checkDifferenceSlice(oldArray, newArray) {

  // Array inizializzato 
  var d = new Array();

  if (oldArray.length === 0) {
    return newArray;
  }

  // Il caso in cui gli array sono uguali, perché l'ultimo elemento è lo stesso (cioè il primo dell'Array)
  if (oldArray[0].id === newArray[0].id) {
    return d;
  }

  // Cerco in che posizione è il primo elemento del vecchio array
  var index = newArray.map(function (e) {
    return e.name;
  }).indexOf(oldArray[0].id);

  // Se non c'è vuol dire che il nuovo array è totalmente nuovo! Lo restituisco tutto
  if (index === -1) {
    d = newArray;
    return d;
  }

  // Altrimenti ne faccio la slice e restisco solo il nuovo array differenza
  d = newArray.slice(0, index);

  return d;

}

function checkDifference(oldArray, newArray) {
  var d = new Array();
  d = newArray.filter(comparer(oldArray));
  return d;
}

function comparer(otherArray) {
  return function (current) {
    return otherArray.filter(function (other) {
      return other.id === current.id
    }).length == 0;
  }
}

// Fare un check che sp=0 in modo da averli ordinati
function controlla(url, callback) {

  // if (!subitoUrl(url)) return;

  // if (!okUrl) return;

  request(url, (error, response, body) => {

    if (response && response.statusCode == REQUEST_OK) {

      // DOM dall'url
      const dom = new JSDOM(body);

      // Prendo tutti gli articoli
      var articles = dom.window.document.querySelectorAll(ARTICLE_DOM);

      // L'array di tutti gli ID contenuti
      var arts = new Array();

      articles.forEach(function (ar, i) {

        var id = ar.getAttribute(DATA_ID);

        var a = new JSDOM(ar.innerHTML);

        var name = a.querySelectorAll(H2_DOM)[0].querySelectorAll(A_DOM)[0].textContent;
        var price = a.querySelectorAll(ITEM_PRICE_DOM)[0].textContent;
        var url = a.querySelectorAll(H2_DOM)[0].querySelectorAll(A_DOM)[0].getAttribute(HREF_DOM);
        var img = a.querySelectorAll(IMG_DOM)[0].getAttribute(SRC_DOM);
        var time = a.querySelectorAll(TIME_DOM)[0].getAttribute(DATETIME_DOM);

        // creo nuovo Article
        var art = new Article(id, name, price, url, img, time);

        // se l'ID non è nullo lo aggiungo
        if (art.id) {
          arts.push(art);
        }

      })

      callback(arts);

      return;

    } else {
      console.log(ERROR);
      return;
    }

  });
}

function mail(array, to) {

  var text = 'Ci sono nuove inserzioni, ecco gli ID dei prodotti nuovi dall\'ultima volta che hai effettuato la ricerca:\n' + array.toString();

  var data = {
    from: defaultFrom,
    to: to,
    subject: "Nuove inserzioni su Subito.it!",
    text: text
    // html: "<h1>Testing some Mailgun awesomness!</h1>"
  };

  mailgun.messages().send(data, (error, body) => {
    console.log(body);
  });

}