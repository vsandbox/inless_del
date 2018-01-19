const path = require('path');
const express =  require('express');

const port = 8081;
const app = express();

app.use('/ui', express.static('./packages/ui/dist'));
app.listen(port);
console.log(`Listen to :${port}`);
