const fs = require('fs')

const input = "package-lock.json"

for (let i=1;i<=10;i++) {
  // fs.mkdirSync(`resources/${i}`);
  for (let j=1;j<=100;j++) {
    fs.copyFileSync("./sample.jpeg", `resources/${i}/${j}.jpeg`);
  }
}