const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const path = require('path');

const app = express();
const blogRoutes = require('./src/routes/blog');


app.use(bodyParser.json());

app.use ((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
 
})

app.use('/v1/blog/', blogRoutes);

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({message: message, data: data});
});

mongoose.connect('mongodb+srv://Andrews:200101@cluster0.o6syanx.mongodb.net/HelpMeMagang?retryWrites=true&w=majority')
.then(() => {
    app.listen(4000, () => console.log('Koneksi Berhasil'));

})
.catch(err => console.log(err));

