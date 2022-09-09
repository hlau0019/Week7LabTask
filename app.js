/*
Student Name: Hiu Lam Lau
Student id: 32356676
Subject: FIT2095 Week 7 Lab Task
*/
const express = require('express');
const mongoose = require('mongoose');

const senders = require('./routers/sender');
const parcels = require('./routers/parcel');

const app = express();

app.listen(8080);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/Week7LabTask', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

//Endpoints - Senders
app.get('/senders/:name', senders.getAll); //task 1 get sender by name
app.post('/senders', senders.createOne); //task 1 create
app.put('/senders', senders.updateOne); // task 1 update
app.put('/senders/parcels', senders.addParcel); //task 2 addParcel
app.delete('/senders', senders.deleteOne); //task 1 delete


//Endpointsb-Parcels
app.get('/parcels', parcels.getAll);
app.put('/parcels', parcels.updateOne);
app.put('/parcels/extra', parcels.updateById);