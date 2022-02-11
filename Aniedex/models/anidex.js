const mongoose = require('mongoose')

const AnidexSchema = new mongoose.Schema ({
    name: String,
    img: String,
    genre: String,
    studio: String,
    completed: Boolean,
    review: String,
    comments: String
 
})















// {
//     name: 'Dragon Ball Z',
//     img: 'https://imgur.com/gallery/Uw7aVyd.jpg',
//     genre: 'Action, Adventure, Fantasy',
//     studio: 'Toei Animation',
//     completed: true,
//     review: '8.5 out of 10',
//     comments:'Fun fights scenes. Too much talking'
//  },