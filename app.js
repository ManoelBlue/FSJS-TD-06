// Imports:
const express = require('express');
const path = require('path');
const data = require('./data.json');

// Create express app:
const app = express();

// Set templates:
app.set('view engine', 'pug');
// Set static files:
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

// 404 handler:
app.use((req, res, next) => {
    const err = new Error('The page was NOT FOUND.');
    err.status = 404;
    next(err);
})

// Handle errors:
app.use((err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || 'The server encountered an error';

    res.locals.error = err;
    res.status(err.status);
    if (err.status === 404) {
        res.render('page-not-found', err);
    } else {
        res.render('error', err);
    }
});

app.listen(4000, () => {
    console.log('Listening to on port 4000...');
});