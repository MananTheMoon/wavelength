const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 5000;

const app = express();
// app.use(index)

const path = require("path");
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", function (req, res) {
  res.sendFile("index.html", {
    root: path.join(__dirname, "../frontend/build"),
  });
});

const server = http.createServer(app);

const io = socketIo(server);

let interval;

let wavelengthData = {
  activeTeam: "admin",
  dialAngle: 0,
  targetRange: 0,
  covered: true,
  prompt: {
    left: "Left",
    right: "right",
  },
};

let players = {};

const sendGameData = async () => {
  console.log("Sending GameData");
  console.log(wavelengthData);
  io.emit("wavelengthData", wavelengthData);
};

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("listPlayers", players);
  sendGameData();

  if (interval) {
    clearInterval(interval);
  }

  socket.on("updateAngle", (angle) => {
    wavelengthData.dialAngle = angle;
    console.log("Dial Angle set to ", angle);
    sendGameData();
  });

  socket.on("setTargetRange", (angle) => {
    wavelengthData.targetRange = angle;
    console.log("Target Range set to ", angle);
    sendGameData();
  });

  socket.on("setCovered", (covered) => {
    wavelengthData.covered = covered;
    console.log("Set covered to ", covered);
    sendGameData();
  });

  socket.on("setActiveTeam", (team) => {
    wavelengthData.activeTeam = team;
    console.log("Set team to ", team);
    sendGameData();
  });

  socket.on("setPrompt", (prompt) => {
    wavelengthData.prompt = prompt;
    console.log("Set prompt to ", prompt);
    sendGameData();
  });

  // socket.on("setGameState", (gameState) => {
  //   gameData.gameState = gameState;
  //   if (gameState == "UNSTARTED") {
  //     gameData.guesses = {};
  //     gameData.buckets = {};
  //   }
  //   if (gameState == "BIDDING") {
  //     gameData.buckets = {};
  //     const unique_guesses = [...new Set(Object.values(gameData.guesses))].sort(
  //       (a, b) => a - b
  //     );

  //     // Number of blank buckets to pad on either side
  //     guesses_padding = Math.floor((7 - unique_guesses.length) / 2);
  //     for (let i = 0; i < guesses_padding; i++) {
  //       unique_guesses.push(null);
  //       unique_guesses.unshift(null);
  //     }
  //     if (unique_guesses.length < 7) {
  //       unique_guesses.splice(3, 0, null);
  //     }
  //     unique_guesses.unshift(0); // To add bucket for less than smallest
  //     console.log(unique_guesses);
  //     for (let i = 0; i < 8; i++) {
  //       let bucket = {
  //         payout: payouts[i],
  //         guessers: [],
  //         value: unique_guesses[i],
  //         bids: {},
  //       };
  //       Object.keys(players).forEach((player) => {
  //         if (gameData.guesses[player] === unique_guesses[i]) {
  //           bucket.guessers = [...bucket.guessers, player];
  //         }
  //       });

  //       gameData.buckets[i] = bucket;
  //     }
  //     console.log(gameData.buckets);
  //   }
  //   sendGameData();
  // });

  interval = setInterval(() => sendGameData(socket), 10000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    const user = Object.keys(players).find((key) => players[key] === socket.id);
    delete players[user];
    io.emit("listPlayers", players);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
