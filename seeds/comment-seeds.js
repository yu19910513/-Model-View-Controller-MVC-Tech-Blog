const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 1,
        comment: "This is amazing!"
    },
    {
        user_id: 4,
        post_id: 4,
        comment: "Wow, amazing work!"
    },
    {
        user_id: 1,
        post_id: 4,
        comment: "Awesome! kudos to everyone who have contributed"
    },
    {
        user_id: 3,
        post_id: 4,
        comment: "We just reached a million subscribers! Fantastic!"
    },
    {
        user_id: 3,
        post_id: 2,
        comment: "This is great news!"
    },
    {
        user_id: 3,
        post_id: 4,
        comment: "This is one of our biggest and the most awaited feature. Keep up the good work!"
    },
    {
        user_id: 4,
        post_id: 3,
        comment: "Very useful tool!"
    },
    {
        user_id: 2,
        post_id: 1,
        comment: "Nice tool!"
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
