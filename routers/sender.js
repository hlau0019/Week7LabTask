const mongoose = require('mongoose');

const Sender = require('../models/sender');
const Parcel = require('../models/parcel');
const { send } = require('process');

const ObjectId = mongoose.Types.ObjectId;

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

        let aParcel = new Parcel(req.body.parcels)
        Sender.findOne({ _id: ObjectId(req.body._id)}, function (err, sender) {
            if (err) return res.status(400).json(err);
            if (!sender) return res.status(404).json();
            //error 404 not found

            aParcel.save(function(err, parcel){
                sender.parcels.push(aParcel);
                sender.save(function(err, result){
                    if(err) return res.json(err);
                    res.json(result);
                });
            })

        });
    },

}