const mongoose = require('mongoose');

const connection = mongoose.connect(`mongodb+srv://omhari:iqoo@cluster0.ej7gnt2.mongodb.net/FoodDilivery?retryWrites=true&w=majority`);


module.exports ={
    connection
}