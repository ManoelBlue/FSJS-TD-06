const express = require('express');
const path = require('path');

const data = require('./data.json');

const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));


// Set routes:
app.get('/', (req, res) => {
    res.render('index', {projects: data.projects});
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/projects/:id', (req, res) => {
    res.render('project', {project: data.projects[req.params.id]});
});

// Intentional 500 error:
app.use('/500', (req, res, next) => {
    const err500 = new Error('Error 500');
    err500.status = 500;

    res.locals.error = err500;
    res.status(err500.status);
    res.render('error', err500);
});

// 404 hanlder:
app.use((req, res, next) => {
    const err = new Error('The page was NOT FOUND.');
    err.status = 404;
    next(err);
})


// Handle errors:
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    if (err.message && err.status) {
        res.render('error', err);
    }
});

app.listen(4000, () => {
    console.log('Listening to on port 4000...');
});