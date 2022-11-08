const fs = require('fs');
const path = require('path');

const berkas = path.resolve(__dirname, 'notes.txt');
const data = fs.readFileSync(berkas, 'UTF-8');
console.log(data);