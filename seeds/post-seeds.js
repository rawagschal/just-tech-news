// SAMPLE POSTS

const { Post } = require('../models');

const postdata = [
    {
        title: 'post number one',
        post_url: 'https://www.nytimes.com/live/2020/11/08/us/trump-biden',
        user_id: 1
    },
    {
        title: 'post number two',
        post_url: 'https://www.washingtonpost.com/world/the_americas/mexico-marijuana-legalize/2020/11/07/27a5fa6c-1925-11eb-82db-60b15c874105_story.html',
        user_id: 2
    },
    {
        title: 'post number three',
        post_url: 'https://www.bbc.com/news/world-54867793',
        user_id: 3
    },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;