const memberData = require('../models/Message');

// Controller to create a new gift data entry
exports.creatememberData = async (req, res) => {
    try {
        const newmemberData = new memberData(req.body);
        await newmemberData.save();
        res.status(201).json(newmemberData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to get all gift data entries
exports.getAllmemberData = async (req, res) => {
    try {
        const messages = await memberData.find();
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to get a single gift data entry by ID
exports.getmemberDataById = async (req, res) => {
    const { id } = req.params;
    try {
        const messages = await memberData.findById(id);
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
exports.updatememberData = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedmemberData = await memberData.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedmemberData) {
            return res.status(404).json({ message: 'Gift data not found' });
        }
        res.status(200).json(updatedmemberData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to delete a gift data entry
exports.deletememberData = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedmemberData = await memberData.findByIdAndDelete(id);
        if (!deletedmemberData) {
            return res.status(404).json({ message: 'Gift data not found' });
        }
        res.status(200).json({ message: 'Gift data deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
