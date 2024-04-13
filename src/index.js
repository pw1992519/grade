const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.static('./src/client'));
// Accept json data
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use('/api', require('./router'));

app.listen(5000, () => {
    console.log('the server is running: http://localhost:5000');
});