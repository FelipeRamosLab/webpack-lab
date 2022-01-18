const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(80, ()=>{
    console.log('\n> The app is currently running on: http://localhost:80\n');
});
