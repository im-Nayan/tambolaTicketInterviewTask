const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ticketSchema = new Schema({
    generated_ticket: {
        type: [],
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });
const ticket_model = mongoose.model('ticketModel', ticketSchema);
module.exports = ticket_model;