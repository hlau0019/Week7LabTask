const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const parcelSchema = mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId, auto: true},
    sender:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Sender'
    }],
    address:{type:String,required: true,
             validate:{
                validator: function(aAddress){
                    return aAddress.length >= 3;
                },
                message: 'Address should be more than or equal to 3 characters'
             }
    },
    weight:{type:Number,required: true},
    fragile:{type:Boolean,required: true}
});

module.exports = mongoose.model('Parcel',parcelSchema);
