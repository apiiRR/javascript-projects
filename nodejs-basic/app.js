// const coffee = require('./coffee');
// const { firstName, lastName } = require('./user');

// console.log(coffee);
// console.log(firstName);
// console.log(lastName);

// const moment = require('moment');

// const date = moment().format("MMM Do YY");
// console.log(date);

const { EventEmitter } = require('events');

const myEventEmitter = new EventEmitter();

const makeCoffe = (name) => {
    console.log(`Kopi ${name} telah dibuat!`);
}

const makeBill = (price) => {
    console.log(`Bill sebesar ${price} telah dibuat!`);
}

const onCoffeOrderedListener = ({ name, price }) => {
    makeCoffe(name);
    makeBill(price);
}

myEventEmitter.on('coffe-order', onCoffeOrderedListener);

myEventEmitter.emit('coffe-order', { name: 'Tubruk', price: 15000 });