const mongoose = require('mongoose');


const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI,{dbName: 'test'}).then(con => console.log(`MongoDB Database connected with HOST: ${con.connection.host}`))
        .catch((err) => console.log(`MongoDB Database connection error: \n${err}`));
}

module.exports = connectDatabase;