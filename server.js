var express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

var port = process.env.PORT || 3000;
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrent', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (test) => {
    return test.toUpperCase();
})

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method}  ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('Unable to fetch the content');
    })
    next();
});
app.use((req, res, next) => {
    res.render('maintance.hbs');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'HOME PAGE',
        welcomeMessage: 'welcome to my website'

    });
    // res.send('Hello Ankit');
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',


    });
});


app.listen(port, () => {
    console.log(`server is now started at ${port}`);
});  