const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 1,
        comment: "wrong"
    },
    {
        user_id: 4,
        post_id: 4,
        comment: "so right"
    },
    {
        user_id: 2,
        post_id: 4,
        comment: "Awesome!"
    },
    {
        user_id: 3,
        post_id: 4,
        comment: "tech blog is boring"
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
