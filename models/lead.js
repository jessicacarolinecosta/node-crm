module.exports = () => {
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const schema =  Schema({ 
        name: {type: String, required: true },
        email: {type: String, required: true},
        phone: {type: String, required: true },
        state: {type: String, required: false},
        city: {type: String, required: false},
        obs: {type: String, required: false},
    });

    return mongoose.model('Lead', schema);
}   