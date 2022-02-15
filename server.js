//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
require('dotenv').config()
const Anidex = require('./anidex.js')
const aniSeed = require('./anidexSeed.js')
const mongoURI = 'mongodb://localhost:27017/' + 'anidex'
app.use(express.static("public"))




//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
app.put('/anidex/:id', (req, res) => {
  if (req.body.completed === 'on') {
      req.body.completed = true;
  } else {
    req.body.completed = false;
  }
  Anidex.findByIdAndUpdate(req.params.id, req.body, 
    {new:true}, (error, updatedModel)=>{
      res.redirect('/anidex')
    })
  })


app.delete('/anidex/:id', (req, res) =>{
  Anidex.findByIdAndRemove(req.params.id, (error, data) =>
  {
    res.redirect('/anidex')
  })
})


app.get('/anidex/new',   (req, res) => {
  res.render('new.ejs')
})

app.get('/anidex/:id/edit', (req, res)=> {
  Anidex.findById(req.params.id, (error, foundShows) =>{
      res.render(
        'edit.ejs',
        {
          anidex:foundShows
        }
      )
    })
  })



  app.get('/anidex/:id', (req, res) => {
    Anidex.findById(req.params.id, (error, foundShows)=>{
      console.log(foundShows);
      res.render('show.ejs',
      {
        anidex:foundShows
      })
    })
  })
  




app.get('/anidex', (req, res) =>{
  Anidex.find({}, (err, allAni) =>{
    res.render('index.ejs',
    {
      anidex: allAni
    })
  })
})

app.post('/anidex', (req, res)=> {
if (req.body.completed === 'on') {
    req.body.completed = true;
}else {
  req.body.completed = false;
}
Anidex.create(req.body, (error, createdShows) =>{
  res.redirect('/anidex')
})
})



// Anidex.create(aniSeed, (err, data) => {
//   if (err) {
//       console.log(err.message);
//   }else {
//     console.log('Added shows to anidex');
//   }
// })






//___________________
localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World pp');
});

//___________________
//Listener
//___________________
app.listen(3000, () => console.log( 'Listening on port:', 3000));


