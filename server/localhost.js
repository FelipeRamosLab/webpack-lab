const express = require('express');
const app = express();

app.use(express.static('dist'));

app.listen(8000, ()=>{
    console.log('\n> The app is currently running on: http://localhost:8000\n');
});
