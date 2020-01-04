//Define Dependences
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const expressValidatior = require('express-validator');
const path = require('path');

//Import file routes ./app/routes/...
const user = require('./app/routes/userRoute');
const contact = require('./app/routes/contactRoute');
const chat = require('./app/routes/socketChatRoute');
//Connect to DBDB
mongoose.connect(
    'mongodb+srv://admin:'+
    process.env.MONGO_ATLAS_PASSWORD+
    '@chat-app-jndsi.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        
    }
);
//Content
const app = express();
app.set('Secret', process.env.SECURITY_KEY_TOKEN);
// console.log("app"+process.env.SECURITY_KEY_TOKEN);
const validationOption = {};

app.use(expressValidatior(validationOption));
//Middlerware
//set secret

/**Setup morgan */
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname)   
/**Set up body parser  */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '500mb', 
  extended: true
}));
// app.use(bodyParser.json({ limit: '500mb' }));

//route
app.use('/', user);
app.use('/', contact);
app.use('/', chat);

//Catch 404
app.use((req,res,next) => {
    const err = new Error('Not found!');
    res.status = 404;
    next(err);
});
//Error handler function
app.use((req,res,next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    //repond client
    res.status(status).json({
        error:{
            message: error.message
        }
    });
});

//Module exports
module.exports = app;