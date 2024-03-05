const DonationData = require('../models/Donation');

// Controller to create a new gift data entry
exports.createDonationData = async (req, res) => {
    try {
        const newDonationData = new DonationData(req.body);
        await newDonationData.save();
        res.status(201).json(newDonationData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to get all gift data entries
exports.getAllDonationData = async (req, res) => {
    try {
        const donations = await DonationData.find();
        res.status(200).json(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to get a single gift data entry by ID
exports.getDonationDataById = async (req, res) => {
    const { id } = req.params;
    try {
        const donations = await DonationData.findById(id);
        if (!donations) {
            return res.status(404).json({ message: 'Gift data not found' });
        }
        res.status(200).json(DonationData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to update a gift data entry
exports.updateDonationData = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedDonationData = await DonationData.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedDonationData) {
            return res.status(404).json({ message: 'Gift data not found' });
        }
        res.status(200).json(updatedDonationData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to delete a gift data entry
exports.deleteDonationData = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDonationData = await DonationData.findByIdAndDelete(id);
        if (!deletedDonationData) {
            return res.status(404).json({ message: 'Gift data not found' });
        }
        res.status(200).json({ message: 'Gift data deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
