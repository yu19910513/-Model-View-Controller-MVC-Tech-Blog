const { Post } = require('../models');

const postData = [
    {
        name: 'today at work',
        content: 'i am gonna cry',
        user_id: 1
    },
    {
        name: 'for chris',
        content: 'happy birthday',
        user_id: 4
    },
    {
        name: 'amazing worker',
        content: 'only me know',
        user_id: 2
    },
    {
        name: 'something is going wrong',
        content: 'guess what it is',
        user_id: 3
    }
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
