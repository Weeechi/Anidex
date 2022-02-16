const mongoose = require('mongoose')

const anidexSchema = new mongoose.Schema ({
    name: String,
    img: String,
    genre: String,
    studio: String,
    completed: Boolean,
    review: String,
    comments: String
 
})
const Anidex = mongoose.model('Anidex', anidexSchema )

module.exports = Anidex











// {
//     name: 'Dragon Ball Z',
//     img: 'https://imgur.com/gallery/Uw7aVyd.jpg',
//     genre: 'Action, Adventure, Fantasy',
//     studio: 'Toei Animation',
//     completed: true,
//     review: '8.5 out of 10',
//     comments:'Fun fights scenes. Too much talking'
//  },