const { User, Thought } = require('../models');

const userController = {
  // Get all users
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Create a new user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  // Update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete user and remove associated thoughts
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        // Remove user's associated thoughts
        return Thought.deleteMany({ username: dbUserData.username });
      })
      .then(() => {
        res.json({ message: 'User and associated thoughts deleted successfully!' });
      })
      .catch((err) => res.status(400).json(err));
  },

 // Add a friend
 addFriend({ params }, res) {
  User.findOneAndUpdate(
    { _id: params.userId },
    { $addToSet: { friends: params.friendId } },
    { new: true, runValidators: true }
  )
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      res.json({ message: 'Friend added successfully', user: dbUserData });
    })
    .catch((err) => {
      console.error('Error in addFriend:', err);
      res.status(400).json({ message: 'An error occurred', error: err.message });
    });
},

  // Remove friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

   // Get a user's friend list
   getUserFriends({ params }, res) {
    console.log('Getting friends for user ID:', params.userId);
    User.findOne({ _id: params.userId })
      .populate('friends', 'username email')
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        console.log('User data retrieved:', JSON.stringify(dbUserData, null, 2));
        
        const friends = dbUserData.friends || [];
        if (friends.length === 0) {
          return res.status(200).json({ 
            message: "User has not added any friends yet.",
            friends: []
          });
        }
        res.json({
          message: `User has ${friends.length} friend(s)`,
          friends: friends
        });
      })
      .catch((err) => {
        console.error('Error in getUserFriends:', err);
        res.status(400).json({ message: 'An error occurred', error: err.message, stack: err.stack });
      });
  },

};

module.exports = userController;