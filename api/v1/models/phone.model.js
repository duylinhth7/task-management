const mongoose = require('mongoose');


const phoneSchema = new mongoose.Schema({

    url: String,
    image: String,
    name: String,
    old_price: Number,
    special_price: Number,
    images: Array,
    tskt: [
        {
            name: String,
            value: String
        }
    ],
    capacities: [
        {
            capacity: String,
            price: Number,
            color: [
                {
                    color: String,
                    price: Number
                }
            ]
        }
    ]
}, { timestamps: true });
const Phone = mongoose.model("Phone", phoneSchema, "phone");

module.exports = Phone;