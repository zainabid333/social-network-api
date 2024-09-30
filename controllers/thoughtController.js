const { Thought, User } = require("../models");
const mongoose = require("mongoose");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().lean();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).lean(); // Use lean() to simplify the object
      console.log(thought); // Check the response object

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought); // Send the simplified object
    } catch (err) {
      console.error("Error in getSingleThought:", err); // Improved error logging
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message }); // Send error details
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought created but no user with this ID!" });
      }

      res.json({ message: "Thought created!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      ).lean();

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const { thoughtId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
        return res.status(400).json({ message: "Invalid thought ID format" });
      }

      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      await Thought.findByIdAndDelete(thoughtId);

      const user = await User.findOneAndUpdate(
        { thoughts: thoughtId },
        { $pull: { thoughts: thoughtId } },
        { new: true }
      );

      if (!user) {
        console.warn(
          "Thought deleted but no user with this thought was found."
        );
      }

      res.json({ message: "Thought successfully deleted!" });
    } catch (err) {
      console.error("Error in deleteThought:", err);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  },

  // Add a reaction
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      ).lean();

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove a reaction
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      ).lean();

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
