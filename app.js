const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

//router
const categoriesRouter = require('./app/api/v1/categories/router')
const imageRouter = require('./app/api/v1/images/router')
const talentsRouter = require('./app/api/v1/talents/router')
const eventsRouter = require('./app/api/v1/events/router')
const organizersRouter = require('./app/api/v1/organizers/router')
const authCMSRouter = require('./app/api/v1/auth/router')

//cms
const v1 = '/api/v1/cms'

//middlewares
const notFoundMiddleware = require('./app/middlewares/not-found')
const handleErrorMiddleware = require('./app/middlewares/handle-error')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to api semina'
  })
});

app.use(v1, categoriesRouter)
app.use(v1, imageRouter)
app.use(v1, talentsRouter)
app.use(v1, eventsRouter)
app.use(v1, organizersRouter)
app.use(v1, authCMSRouter)

app.use(notFoundMiddleware)
app.use(handleErrorMiddleware)

module.exports = app;
