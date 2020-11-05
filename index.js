const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// set up express app
const app = express();

//connect to mongo db
mongoose.connect('mongodb+srv://Hannovdw1998:Hannovdw1998@hannocluster.6soqj.mongodb.net/Proj2_MetaData?retryWrites=true&w=majority',{ useUnifiedTopology: true,useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false
})
.then(() =>  {
    console.log("MongoDB Atlass connected....")
});

mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

//initialize routes
app.use('/api',require('./routes/api'));

//error handling middleware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error: err.message})
});

//listen for rewuests
app.listen(process.env.port || 4000,function(){
    console.log('now listening');
});
