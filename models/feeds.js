const mongoose = require('mongoose')

const feedsSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    movieTitle:{
        type: String,
        required: true
    },
    Director:{
        type: String,
        required: true,
        minlength: [2, 'Rating must be at least 2 charcter ']
    },
    Rating:{
        type: Number,
        required: true
       
    },
    Comment:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Feeds', feedsSchema)