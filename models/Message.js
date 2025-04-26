const mongoose =  require('mongoose');

const messageSchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Message', messageSchema);