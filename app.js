const express = require('express');
const path = require('path');

const data = require('./data.json');

const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', {projects: data.projects});
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/projects/:id', (req, res) => {
    res.render('project');
});

app.listen(4000, () => {
    console.log('Listening to on port 4000...');
});