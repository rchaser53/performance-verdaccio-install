const fs = require('fs');
const _ = require('lodash')
const { ReadTarball } = require('@verdaccio/streams');

const getTarball = (pathName) => {
  const readTarballStream = new ReadTarball({});

  const readStream = fs.createReadStream(pathName);

  readStream.on('error', function (err) {
    readTarballStream.emit('error', err);
  });

  readStream.on('open', function (fd) {
    fs.fstat(fd, function (err, stats) {
      if (_.isNil(err) === false) {
        return readTarballStream.emit('error', err);
      }
      readTarballStream.emit('content-length', stats.size);
      readTarballStream.emit('open');
      readStream.pipe(readTarballStream);
    });
  });

  readTarballStream.abort = function () {
    readStream.close();
  };

  return readTarballStream;
}

module.exports = {
  getTarball
}