const MessageData = require('../models/Message');

// Controller to create a new gift data entry
exports.createMessageData = async (req, res) => {
    try {
        const newMessageData = new MessageData(req.body);
        await newMessageData.save();
        res.status(201).json(newMessageData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to get all gift data entries
exports.getAllMessageData = async (req, res) => {
    try {
        const messages = await MessageData.find();
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to get a single gift data entry by ID
exports.getMessageDataById = async (req, res) => {
    const { id } = req.params;
    try {
        const messages = await MessageData.findById(id);
        if (!messages) {
            return res.status(404).json({ message: 'Gift data not found' });
        }
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to update a gift data entry
exports.updateMessageData = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedMessageData = await MessageData.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMessageData) {
            return res.status(404).json({ message: 'Gift data not found' });
        }
        res.status(200).json(updatedMessageData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to delete a gift data entry
exports.deleteMessageData = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMessageData = await MessageData.findByIdAndDelete(id);
        if (!deletedMessageData) {
            return res.status(404).json({ message: 'Gift data not found' });
        }
        res.status(200).json({ message: 'Gift data deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
