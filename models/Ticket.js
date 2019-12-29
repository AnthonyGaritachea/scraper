const mongoose = require('mongoose');

const Ticket = mongoose.model('AmtrakTicket', mongoose.Schema({
    value: String,
    departureAndArrival: String,
    duration: String,
    transportationType: String 
}));
 
module.exports = Ticket;
