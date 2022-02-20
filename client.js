const axios = require('axios');
const { createKey } = require('./utils');

;(async () => {
  try {
    console.time("start");
    for (let i=1;i<=10;i++) {
      for (let j=0;j<10;j++) {
        const promises = [];
        for (let k=0;k<10;k++) {
          const fileName = j * 10 + k + 1;
          promises.push(
            axios.get(`http://localhost:3000/use-cache/${i}/${fileName}`)
            // axios.get(`http://localhost:3000/use-stream/${i}/${fileName}`)
          );
        }
        await Promise.all(promises);
      }
    }
    console.timeEnd("start");
  } catch (err) {
    console.error(err)
  }
  
  // console.log(data)
})()

