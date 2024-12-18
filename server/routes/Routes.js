const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

// Create new game
router.post('/game', async (req, res) => {
  const { player1, player2, score, rounds, winner } = req.body;
  const newGame = new Game({ player1, player2, score, rounds, winner });
  try {
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: 'Error saving game', error });
  }
});

// Get all games
router.get('/games', async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching games', error });
  }
});

module.exports = router;
