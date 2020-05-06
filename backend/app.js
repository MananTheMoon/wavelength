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
  teams: {
    team1: {
      name: "Team 1",
      score: 0,
      position: "left", // or right or center
      shown: true,
    },
    team2: {
      name: "Team 2",
      score: 0,
      position: "left", // or right or center
      shown: true,
    },
    team3: {
      name: "Team 3",
      score: 0,
      position: "right", // or right or center
      shown: true,
    },
    team4: {
      name: "Team 4",
      score: 0,
      position: "right", // or right or center
      shown: false,
    },
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
    // Move activeTeam away from center
    if (
      wavelengthData.activeTeam &&
      wavelengthData.teams[wavelengthData.activeTeam]
    ) {
      wavelengthData.teams[wavelengthData.activeTeam].position = "left";
    }

    // Set new Active Team and move it to center
    wavelengthData.activeTeam = team;
    console.log("Set active team to ", team);
    if (wavelengthData.teams[team]) {
      wavelengthData.teams[team].position = "center";
    }
    sendGameData();
  });

  socket.on("setTeamPosition", (team, position) => {
    if (wavelengthData.teams[team]) {
      wavelengthData.teams[team].position = position;
      console.log(`Set ${team} position to ${position}`);
      sendGameData();
    } else {
      console.log(`FAILED: Set ${team} position to ${position}`);
    }
  });

  socket.on("setTeamScore", (team, score) => {
    if (wavelengthData.teams[team]) {
      wavelengthData.teams[team].score = score;
      console.log(`Set ${team} score to ${score}`);
      sendGameData();
    } else {
      console.log(`FAILED: Set ${team} score to ${score}`);
    }
  });

  socket.on("setShowTeam", (team, shown) => {
    if (wavelengthData.teams[team]) {
      wavelengthData.teams[team].shown = shown;
      console.log(`Set ${team} visibility to ${shown}`);
      sendGameData();
    } else {
      console.log(`FAILED: Set ${team} visibility to ${shown}`);
    }
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
