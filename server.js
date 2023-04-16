// if(process.env.NODE_ENV !== 'production'){
//     require('dotenv').config({path: '/custom/path/to/.env'});
// }


const express = require('express')
const mongoose = require('mongoose')
const feeds = require('./models/feeds')
const feedRouter = require('./routes/feed')
const methodOveride = require('method-override')
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/4Movies',{useNewUrlParser: true}, {useUnifiedTopology: true}, {useCreateIndex: true})


app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false}))
app.use(methodOveride('_method'))

app.get('/', async (req, res)=> {
    const feed = await feeds.find().sort({createdAt: 'desc'})
    res.render('feed/index', {feed : feed})
})


app.use('/feed', feedRouter)
app.listen(5000) 
