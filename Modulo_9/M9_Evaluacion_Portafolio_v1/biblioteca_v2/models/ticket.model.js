const fs = require('fs');
const file = './data/tickets.json';
function read(){ try{ return JSON.parse(fs.readFileSync(file,'utf8')); }catch(e){ return []; } }
function write(data){ fs.writeFileSync(file, JSON.stringify(data,null,2)); }
module.exports = { read, write };

