const mongoose = require('mongoose');

const Sender = require('../models/sender');
const Parcel = require('../models/parcel');
const { send } = require('process');

module.exports = {
    // task 3 - Get all Parcels by Address (test after Add parcels error solved)
    getAll: function (req, res) {
        console.log(req.query);
        Parcel.find({ address: req.query.address })
        .populate('sender')
            .exec(function (err, parcel) {
                if (err) return res.status(400).json(err);
                if (!parcel) return res.status(404).json();
    
                res.json(parcel);
            });

        console.log(req.query.address);
    },

    // task 3 - Update Parcel Address by ID (test after Add parcels error solved)
    updateOne: function (req, res) {
        Parcel.findOneAndUpdate({ _id: req.body._id }, req.body, function (err, parcel) {
            if (err) return res.status(400).json(err);
            if (!parcel) return res.status(404).json();
    
            res.json(parcel);
        });
    },


    //Extra task
    updateById: function(req, res){

        Parcel.find({_id: req.body._id},function(err,parcel){
            Parcel.findOneAndUpdate(Parcel.weight*10,function(err,parcel){
                if (err) return res.status(400).json(err);
                if (!parcel) return res.status(404).json();
    
                res.json(parcel);
            })
        })

    }
}
