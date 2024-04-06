const app = require('./server');

const connectDatabase = require('./config/database');


app.listen(process.env.PORT || 5000, process.env.HOST, (err) => {
    if (err) {
        return console.log(err);
    }

    connectDatabase();
    console.log(`Server listens http://${process.env.HOST}:${process.env.PORT || 5000}`);
});