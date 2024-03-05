const mongoose = require('mongoose');

// Define a function to format the date
const formatDate = () => {
    const date = new Date();
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
};

// Define a function to format the time
const formatTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Convert 0 to 12 for 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero for single-digit minutes
    return `${formattedHours}.${formattedMinutes} ${ampm}`;
};

const donationDataSchema = new mongoose.Schema({
    date: {
        type: String, // Change the type to String to store the formatted date
        default: formatDate // Set the default value to the formatted date
    },
    time: {
        type: String,
        default: formatTime // Set the default value to the formatted time
    },
    phoneEmail: String,
    donationAmount: Number,
    txId: String,
});

module.exports = mongoose.model('donationData', donationDataSchema);
