const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//criando o Schema de um usuario
const UserSchema = new Schema({
    email: { type: String, required: true, unic: true, lowercase: true},
    password: { type: String, require: true, select: false},
    created: { type: Date, default: Date.now}
});

//Encriptar senha antes de salvar
UserSchema.pre('save', async function(next){   //não usar arrow function por conta do THIS
    let user = this;
    
    if(!user.isModified('password')){   //se não for modificado
        return next();
    }

    user.password = await bcrypt.hash(user.password,10);//encripta usando Bcrypt com salto 10
    return next();

});

module.exports = mongoose.model('User',UserSchema);