module.exports = () => {
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const schema =  Schema({ 
        name: {type: String, required: true },
        password: {type: String, required: true},
        login: {type: String, unique: true, required: true },
        email: {type: String, required: true}                            
    });

    return mongoose.model('Usuario', schema);
}   