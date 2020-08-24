const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String
})

module.exports = mongoose.model('Event', EventSchema);