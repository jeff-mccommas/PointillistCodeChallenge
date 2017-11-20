const http = require('http');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

var sales = [
  { product: "Premium TV", category: "TV", channel: "Web", amount: 34 },
  { product: "Unlimited Internet", category: "Internet", channel: "Mobile", amount: 78 },
  { product: "Advanced Internet", category: "Internet", channel: "Web", amount: 32 },
  { product: "Basic TV", category: "TV", channel: "Mobile", amount: 50 },
  { product: "All-In-One", category: "Bundle", channel: "Store", amount: 78 },
  { product: "Unlimited Internet", category: "Internet", channel: "Store", amount: 81 },
  { product: "All-In-One", category: "Bundle", channel: "Web", amount: 56 },
  { product: "All-In-One", category: "Bundle", channel: "Store", amount: 67 },
  { product: "Basic Internet", category: "Internet", channel: "Mobile", amount: 61 },
  { product: "Unlimited Internet", category: "Internet", channel: "Mobile", amount: 69 }
];

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  var queryParams = querystring.parse(req.url.replace("/", "").replace("?", ""));

  var dict = {};
  sales.forEach(function(sale){
    var cohortValue = queryParams.cohort ? sale[queryParams.cohort] : "all";
    if (!dict[cohortValue]) {
      dict[cohortValue] = 0;
    };
    var value = queryParams.stat && queryParams.stat == "sum" ? sale.amount : 1;
    dict[cohortValue] += value;
  });
  var output = Object.keys(dict).map(function(cohortValue){ return { label: cohortValue, value: dict[cohortValue] } });
  res.end(JSON.stringify(output));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});