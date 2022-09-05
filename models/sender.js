const mongoose = require('mongoose');

const senderSchema = mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId, auto: true},
    name:{type:String,required: true,
            validate:{
                validator: function(aName){
                    return aName.length >= 3;
                },
                message: 'Sender name should be more than or equal to 3 characters'
            }
    },
    parcels: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Parcel'
    }]
    
});

module.exports = mongoose.model('Sender',senderSchema);