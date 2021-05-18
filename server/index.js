import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors';
import postRoutes from './routes/posts.js';

const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

//Connection Middleware
//Every routes inside the postRoutes can be accessed by /posts
// localhost:5000/posts
app.use('/posts',postRoutes);
const PORT=process.env.PORT|| 5000;

mongoose.connect('mongodb://localhost:27017/memories', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log('Connected to Mongodb'))
    .catch((err)=>console.log(err.message))

mongoose.set('useFindAndModify',false)
app.listen(PORT,()=> console.log(`Server running on ${PORT}`))