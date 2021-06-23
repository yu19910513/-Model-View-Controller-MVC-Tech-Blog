const User = require('./User');
const Post = require('./Post');
const Com = require('./Com');

//create associations
User.hasMany(Post, {
    foreignKey: 'userId'
});
User.hasMany(Com, {
    foreignKey: 'userId'
});

Post.hasMany(Com, {
    foreignKey: 'postId'
});

Post.belongsTo(User, {
    foreignKey: 'userId',
});

Com.belongsTo(User, {
    foreignKey: 'userId'
  });

Com.belongsTo(Post, {
    foreignKey: 'postId'
});


module.exports = {User, Post, Com};
