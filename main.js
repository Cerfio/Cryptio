const request = require('request');
const express = require('express')
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
const hostname = '127.0.0.1';
const port = process.env.PORT || 5000;

function getConversion(url) {
  let options = {
    url: url,
    headers: {
      'Authorization': 'Bearer sand_oEVIQaP3ok0JIUbVNTZIVrT5O4b6LwaBPXoFSNZbR80'
    }
  };
  return new Promise(function (resolve, reject) {
    request.get(options, function (err, resp, body) {
      if (err)
        reject(err);
      else
        resolve(body);
    })
  })
}

function send_html_server(res, data) {
  console.log(data);
  if (data.message)
    res.render('index', {
      base: null,
      amount: null,
      new_base: null,
      new_amount: null,
      error: "Something went wrong"
    });
  else
    res.render('index', {
      base: data.from.currency,
      amount: data.from.amount,
      new_base: data.to.currency,
      new_amount: data.to.amount,
      error: null
    });
}

function send_post_server(res, data) {
  if (data.code == "2101") {
    res.send({
      error: "une erreur est survenue"
    });
    return;
  }
  res.send({
    base_currency: data.from,
    quote_currency: data.to,
    rate: data.rate,
    rate_date: data.rate_date
  });
}

function response_conversion(base_currency, new_currency, value, res, server) {
  let url = 'https://sandbox-b2b.revolut.com/api/1.0/rate?from=' + base_currency.toUpperCase() + '&to=' + new_currency.toUpperCase() + '&amount=' + value;
  let data = getConversion(url);
  data.then(JSON.parse).then(function (result) {
    let conversionDetails = result;
    return conversionDetails;
  }).then(function (data) {
    if (server == true)
      send_post_server(res, data);
    else
      send_html_server(res, data);
  });
}

app.post('/', function (req, res) {
  base_currency = req.body.Base;
  new_currency = req.body.Final;
  value = req.body.Amount;

  response_conversion(base_currency, new_currency, value, res, false);
})

app.post('/server', function (req, res) {
  base_currency = req.get("base_currency");
  new_currency = req.get("quote_currency");
  value = req.get("value");

  if (base_currency == undefined)
    res.send({
      Error: "Undefined base_currency"
    });
  else if (new_currency == undefined)
    res.send({
      Error: "Undefined new_currency"
    });
  else if (value == undefined)
    res.send({
      Error: "Undefined value"
    });
  else
    response_conversion(base_currency, new_currency, value, res, true);
})

app.get('/', function (req, res) {
  res.render('index', {
    base: null,
    amount: null,
    new_base: null,
    new_amount: null,
    error: null
  });
})

app.listen(port, () => {
  console.log(`To have the HTML view here http://${hostname}:${port}/`)
  console.log(`To use POST requests here http://${hostname}:${port}/server`)
});