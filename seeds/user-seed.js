const { User } = require('../models');

const userData = [
    {
        name: 'John',
        email: 'chrisabiva@hotmail.com',
        password: 'password'
    },
    {
        name: 'Ben',
        email: 'vinette@hotmail.com',
        password: 'password'
    },
    {
        name: 'Rex',
        email: 'yu19910513@gmail.com',
        password: 'pass123',
        admin: true
    },
    {
        name: 'Joe',
        email: 'matt@hotmail.com',
        password: 'matt'
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
