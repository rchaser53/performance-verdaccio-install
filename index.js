const express = require('express')
const app = express();
const { getTarball } = require('./storage');

app.get('/:scopedPackage/-/:scope/:filename',
  function (req, res) {
    const { scope, scopedPackage, filename } = req.params;

    // const packageName = `${scopedPackage}/${scope}-${filename}`;
    const packageName = "package.json"
    const stream = getTarball(packageName, filename);

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

app.listen(3000, () => {
  console.log('server runs');
})