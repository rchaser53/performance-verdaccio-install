const fs = require('fs');
const express = require('express')
const app = express();
const { getTarball } = require('./storage');
const { createKey } = require('./utils');

const cache = {};
app.get('/use-stream/:i/:j',
  function (req, res) {
    const { i,j } = req.params;
    const packageName = createKey(i,j);
    const stream = getTarball(packageName);

    stream.on('content-length', function (content) {
      res.header('Content-Length', content);
    });
  
    stream.on('error', function (err) {
      return res.locals.report_error(err);
    });
  
    res.header('content-type', 'application/octet-stream; charset=utf-8');
    stream.pipe(res);
  }
);

app.get('/use-cache/:i/:j',
  function (req, res) {
    const { i,j } = req.params;
    const packageName = createKey(i,j);

    // res.header('Content-Length', cache[packageName].length);
    // res.header('content-type', 'application/octet-stream; charset=utf-8');

    try {
      // res.stream()
      res.send(cache[packageName]);
    } catch (err) {
      console.error(err);
    }
  }
);

app.listen(3000, () => {
  for (let i=1;i<=10;i++) {
    for (let j=1;j<=100;j++) {
      const key = createKey(i,j);
      cache[key] = fs.readFileSync(key, { encoding:"utf8" });
    }
  }
  console.log('server runs');
})