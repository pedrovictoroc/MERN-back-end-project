const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    nome: { type: String, required: true},
    quantidade: { type: Number, required: true},
    preço: { type: Number, required: true},
    caracteristicas: {type: String, required: true}
});

module.exports = mongoose.model('Item',ItemSchema);