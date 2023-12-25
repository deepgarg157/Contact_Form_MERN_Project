const mongoose = require('mongoose')

const connect = () => {
    mongoose.connect('mongodb+srv://admin:admin123@cluster0.zeg1dyy.mongodb.net/?retryWrites=true&w=majority')
        .then(() => console.log('server is connected with mongoDB'))
        .catch((error) => console.log(error))
}

connect()