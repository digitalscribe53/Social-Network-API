const { Thought, User } = require('../models');

const thoughtController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

 // Create a new thought
 createThought({ body }, res) {
  console.log('Creating thought with body:', body);
  let createdThought;

  // First, check if the user exists
  User.findById(body.userId)
    .then((dbUserData) => {
      if (!dbUserData) {
        console.log('User not found:', body.userId);
        return res.status(404).json({ message: 'No user found with this id. Thought not created.' });
      }
      console.log('User found, creating thought');
      // If user exists, create the thought
      return Thought.create(body);
    })
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        console.log('Failed to create thought');
        return res.status(400).json({ message: 'Something went wrong creating the thought.' });
      }
      console.log('Thought created:', dbThoughtData);
      createdThought = dbThoughtData;
      // Update the user's thoughts array
      return User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );
    })
    .then((updatedUserData) => {
      if (!updatedUserData) {
        console.log('User not found when updating');
        // If we can't find the user at this point, we should still return the created thought
        return res.status(200).json({ 
          message: 'Thought created but user not found when updating.',
          thought: createdThought 
        });
      }
      console.log('User updated with new thought');
      res.status(200).json({ message: 'Thought successfully created!', thought: createdThought });
    })
    .catch((err) => {
      console.error('Error in createThought:', err);
      // If we've created the thought but encounter an error afterwards, we should still return success
      if (createdThought) {
        res.status(200).json({ 
          message: 'Thought created but an error occurred while updating user.',
          thought: createdThought,
          error: err.message
        });
      } else {
        res.status(400).json({ message: 'Error creating thought', error: err.message });
      }
    });
},

  // Update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        return User.findOneAndUpdate(
          { thoughts: params.id },
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then(() => {
        res.json({ message: 'Thought successfully deleted!' });
      })
      .catch((err) => res.status(400).json(err));
  },

  // Add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // Remove reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;