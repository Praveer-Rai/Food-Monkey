var config = require('./config/config.dev_local');
var app = require('./app');

app.listen(config.port, function(err){
    if (err){
        console.log(err);
    }
    else {
        console.log('Listening to Port 3000');
    }
});