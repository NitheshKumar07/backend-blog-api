const express = require('express');
const app = express();

const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const catRouter = require('./routes/category');
const commentRouter = require('./routes/comment');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://nitesh:nitesh07@api-database.pahwy.mongodb.net/?retryWrites=true&w=majority&appName=api-database')
.then(() => console.log('connected succesfully to database'))
.catch((err) => console.log(err));

app.use(bodyParser.json()); // parse the data in JSON Format

app.use('*', (req, res) => {
    res.status(404).json({msg : 'page not found'})
})
app.use('/user', userRouter);
app.use('/category', catRouter);
app.use('/blog', blogRouter)
app.use('/comment', commentRouter)


module.exports = app;
