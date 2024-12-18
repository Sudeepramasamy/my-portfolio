const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  player1: String,
  player2: String,
  score: {
    player1: Number,
    player2: Number,
  },
  rounds: [String], // Store round results
  winner: String    // Game winner after 6 rounds
});

module.exports = mongoose.model('Game', gameSchema);
