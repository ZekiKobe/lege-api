const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/send', async (req,res) => {
    const { senderName,message} = req.body;
    try {
        const newMessage = new Message({ senderName, message });
        await newMessage.save();
        res.status(200).json({ message: 'Message sent successfully'})
    }
    catch(error){
        res.status(500).json({ message:'Internal server error'});
    }
});

router.get('/allmessages', async (req,res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'})
    }
})

module.exports = router;