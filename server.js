const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('uppThis', (text) => {
    return text.toUpperCase();
})
app.use((req,res,next) => {
    //log the time when user made the req
    var log = `Request was made at ${new Date().toString()} using the ${req.method} method at the ${req.url} url.`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.log('Unable to append to server.log.')
    })
    next();
});
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })
app.set('view engine', 'hbs');
app.get('/', (req, res) => {
      res.render('home.hbs', {
        title: 'This is the main page',
        welcome: 'Welcome on our site, have a nice stay!'
    })
}).listen(3000, () => {
    console.log('Serving on port 3000');
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'This is the About Us page',
        temp: 'template',
    });
});
