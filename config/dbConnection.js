const mongoose = require('mongoose');
const dbConnect = () => {
    const connectParams = {useNewUrlParser: true};
    mongoose.connect(process.env.DB_CONNECT);

    mongoose.connection.on('connected', ()=> {
        console.log('Connected to Database');
    });

    mongoose.connection.on('disconnected', ()=> {
        console.log('Not connected to Database');
    });

    mongoose.connection.on('error', (err)=> {
        console.log('Error connection from DB', err);
    });
}

module.exports = dbConnect;