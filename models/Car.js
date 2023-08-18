const mongoose = require('mongoose');

const Car = mongoose.model('Car', {
    nome: String,
    marca: String,
    preco: Number,
})

module.exports = Car;