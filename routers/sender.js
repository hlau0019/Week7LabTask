const mongoose = require('mongoose');

const Sender = require('../models/sender');
const Parcel = require('../models/parcel');
const { send } = require('process');

module.exports = {
    // task 1 - get all parcels from a sender/ get sender by name
    getAll: function (req, res) {
        Sender.findOne({ name: req.params.name })
            .populate('parcels')
            .exec(function (err, sender) {
                if (err) return res.json(err);
                if (!sender) return res.json();
                res.json(sender);
            });
    },

    // task 1 - Create a new sender ---Done!!!
    createOne: function (req, res) {
        let newSenderDetails = req.body;
        newSenderDetails._id = new mongoose.Types.ObjectId();
    
        let sender = new Sender(newSenderDetails);
        sender.save(function (err) {
            console.log('Done');
            res.json(sender);
        });
    },

    // task 1 - Delete sender by ID ---Done!!!
    deleteOne: function (req, res) {
        Sender.findOneAndRemove({ _id: req.body._id }, function (err) {
            if (err) return res.status(400).json(err);
    
            res.json();
        });
    },
    // task 1 - Update sender's name by ID ---Done!!!
    updateOne: function (req, res) {
        Sender.findOneAndUpdate({ _id: req.body._id }, req.body, function (err, sender) {
            if (err) return res.status(400).json(err);
            if (!sender) return res.status(404).json();
    
            res.json(sender);
        });
    },

    // task 2 - Add Parcel to Sender. The ID of the sender and an object representing the parcel's details are sent through the request's body.
    addParcel: function (req, res) {

        Sender.findOne({ _id: req.body.id }, function (err, sender) {
            if (err) return res.status(400).json(err);
            if (!sender) return res.status(404).json();
            //error 404 not found

            Parcel.findOne({ address: req.body.address },{ weight: req.body.weight },{ fragile: req.body.fragile}, function (err, parcel) {
                if (err) return res.status(400).json(err);
                if (!parcel) return res.status(404).json();
    
                sender.parcels.push(parcel.address,parcel.weight,parcel.fragile);
                sender.save(function (err) {
                    if (err) return res.status(500).json(err);
    
                    res.json(sender);
                });
            })
        });
    },

}