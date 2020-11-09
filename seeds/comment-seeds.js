// SAMPLE COMMENTS

const { Comment } = require('../models');

const commentdata = [
    {
        comment_text: 'This is bad news',
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: 'This is good news',
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: 'This is crazy news',
        user_id: 3,
        post_id: 3
    },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
