const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(cors());
app.use(express.json());

// Create an SQLite database (or open if it already exists)
const db = new sqlite3.Database('./game.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create tables for games and rounds if they don't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player1 TEXT,
    player2 TEXT,
    player1_wins INTEGER DEFAULT 0,
    player2_wins INTEGER DEFAULT 0,
    rounds_played INTEGER DEFAULT 0,
    total_rounds INTEGER DEFAULT 6,
    winner TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS rounds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER,
    round INTEGER,
    player1_choice TEXT,
    player2_choice TEXT,
    winner TEXT,
    FOREIGN KEY (game_id) REFERENCES games(id)
  )`);
});

// Game logic function
const getWinner = (player1Choice, player2Choice) => {
  if (player1Choice === player2Choice) return 'draw';
  if (
    (player1Choice === 'stone' && player2Choice === 'scissors') ||
    (player1Choice === 'scissors' && player2Choice === 'paper') ||
    (player1Choice === 'paper' && player2Choice === 'stone')
  ) return 'player1';
  return 'player2';
};

// Start a new game session
app.post('/start-game', (req, res) => {
  const { player1, player2 } = req.body;

  const sql = `INSERT INTO games (player1, player2) VALUES (?, ?)`;
  db.run(sql, [player1, player2], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Error starting game', error: err.message });
    }
    const gameId = this.lastID;
    res.json({ gameId, message: 'Game started' });
  });
});

// Play a round and store results
app.post('/play-round/:gameId', (req, res) => {
  const { gameId } = req.params;
  const { player1Choice, player2Choice } = req.body;

  db.get(`SELECT * FROM games WHERE id = ?`, [gameId], (err, game) => {
    if (err) return res.status(500).json({ message: 'Error retrieving game' });
    if (!game) return res.status(404).json({ message: 'Game not found' });

    if (game.rounds_played >= game.total_rounds) {
      return res.status(400).json({ message: 'Game over' });
    }

    const roundResult = getWinner(player1Choice, player2Choice);
    const newPlayer1Wins = roundResult === 'player1' ? game.player1_wins + 1 : game.player1_wins;
    const newPlayer2Wins = roundResult === 'player2' ? game.player2_wins + 1 : game.player2_wins;
    const newRoundsPlayed = game.rounds_played + 1;

    const sqlInsertRound = `INSERT INTO rounds (game_id, round, player1_choice, player2_choice, winner) VALUES (?, ?, ?, ?, ?)`;
    db.run(sqlInsertRound, [gameId, newRoundsPlayed, player1Choice, player2Choice, roundResult], function (err) {
      if (err) return res.status(500).json({ message: 'Error storing round result', error: err.message });

      const isGameOver = newRoundsPlayed >= game.total_rounds;
      const finalWinner =
        isGameOver && newPlayer1Wins === newPlayer2Wins
          ? 'draw'
          : newPlayer1Wins > newPlayer2Wins
          ? game.player1
          : game.player2;

      const sqlUpdateGame = `UPDATE games SET player1_wins = ?, player2_wins = ?, rounds_played = ?, winner = ? WHERE id = ?`;
      db.run(sqlUpdateGame, [newPlayer1Wins, newPlayer2Wins, newRoundsPlayed, isGameOver ? finalWinner : null, gameId], function (err) {
        if (err) return res.status(500).json({ message: 'Error updating game', error: err.message });

        res.json({
          roundResult,
          gameSession: { currentRound: newRoundsPlayed }, 
          isGameOver,
          finalWinner: isGameOver ? finalWinner : null,
          roundsPlayed: newRoundsPlayed,
          player1Wins: newPlayer1Wins,
          player2Wins: newPlayer2Wins,
        });
      });
    });
  });
});

// Get game and round data
app.get('/games/:gameId', (req, res) => {
  const { gameId } = req.params;

  db.get(`SELECT * FROM games WHERE id = ?`, [gameId], (err, game) => {
    if (err) return res.status(500).json({ message: 'Error retrieving game' });
    if (!game) return res.status(404).json({ message: 'Game not found' });

    db.all(`SELECT * FROM rounds WHERE game_id = ?`, [gameId], (err, rounds) => {
      if (err) return res.status(500).json({ message: 'Error retrieving rounds' });
      res.json({ game, rounds });
    });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
